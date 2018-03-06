import { Enum, EnumValue, Entity } from './types';
import { StringUtils } from './utils';

export class HintConstraint extends EnumValue {

	static ALL_TEXT: number = -1;
	static LAST_WORD: number = NaN;

	constructor(public label: string, private _wordNumber: number) {
		super();
		this.label = label;
		this._wordNumber = _wordNumber;
	}

	get wordNumber(): number {
		return this._wordNumber;
	}

}

export class HintPattern extends EnumValue {

	static TEXT_PLACEHOLDER = '<>';

	constructor(public label: string, private _pattern: string, private _flags: string = 'i') {
		super();
		this.label = label;
		this._flags = _flags;
		this._pattern = _pattern;
	}

	compile(text: string): string {
		return this.pattern.replace(HintPattern.TEXT_PLACEHOLDER, text);
	}

	get flags(): string {
		return this._flags;
	}

	get pattern(): string {
		return this._pattern;
	}

}

/* tslint:disable */ // ENUM CONSTANTS
export const EnumHintConstraint = Enum.create({
	ALL: new HintConstraint('Todo o texto', HintConstraint.ALL_TEXT),
	FIRST_WORD: new HintConstraint('A primeira palavra', 0),
	SECOND_WORD: new HintConstraint('A segunda palavra', 1),
	THIRD_WORD: new HintConstraint('A terceira palavra', 2),
	FORTH_WORD: new HintConstraint('A quarta palavra', 3),
	LAST_WORD: new HintConstraint('A última palavra', HintConstraint.LAST_WORD)
}, HintConstraint.prototype);

export const EnumHintPattern = Enum.create({
	EQUALS_TO: new HintPattern('É igual a', '^<>$'),
	CONTAINS: new HintPattern('Possui', '<>'),
	STARTS_WITH: new HintPattern('Inicia com', '^(?=<>)'),
	ENDS_WITH: new HintPattern('Termina com', '(?=<>$)'),
	NOT_CONTAINS: new HintPattern('Não possui', '^(?:(?!<>).)*$'),
	NOT_STARTS_WITH: new HintPattern('Não incia com', '^(?!<>)'),
	NOT_ENDS_WITH: new HintPattern('Não termina com', '^(?:(?!<>$).)*$')
}, HintPattern.prototype);
/* tslint:enable */ // END ENUM CONSTANTS

interface IRule {

	test(text: string): boolean;

	textConstraint(): string;

}

export class HintRule extends Entity implements IRule {

	static WHITESPACE = ' ';

	private _regex: RegExp;

	constructor(private _constraint: HintConstraint, private _pattern: HintPattern, private _text: string) {
		super(null);
		this._text = _text;
		this._pattern = _pattern;
		this._constraint = _constraint;
		this.compile();
	}

	test(text: string): boolean {
		let testText;
		if (this.constraint.wordNumber === HintConstraint.ALL_TEXT) {
			testText = text;

			// NaN === NaN = false
		} else if (this.constraint.wordNumber.toString() === HintConstraint.LAST_WORD.toString()) {
			let splitted = text.split(HintRule.WHITESPACE);
			testText = splitted[splitted.length - 1];

		} else {
			testText = text.split(HintRule.WHITESPACE)[this._constraint.wordNumber];
		}

		// Apply test only if testText is defined and not empty.
		return testText ? this._regex.test(testText) : false;
	}

	textConstraint(): string {
		let text;
		if (this._constraint === EnumHintConstraint.ALL) {
			text = `${this._pattern.label.toLowerCase()} "${this._text}"`;
		} else {
			text = `${this._constraint.label} ${this._pattern.label.toLowerCase()} "${this._text}"`;
		}
		return StringUtils.capitalize(text);
	}

	get text(): string {
		return this._text;
	}

	get pattern(): HintPattern {
		return this._pattern;
	}

	get constraint(): HintConstraint {
		return this._constraint;
	}

	private compile(): RegExp {
		if (!this._regex) {
			this._regex = new RegExp(this._pattern.compile(this._text), this.pattern.flags);
		}
		return this._regex;
	}

}

export class Hint extends Entity {

	private _obsolete: boolean = false;
	private _rules: IRule[] = [];

	constructor(id: number, public label: string = '') {
		super(id);
		this.label = label;
	}

	test(text: string): TestResult[] {
		if (this._rules.length === 0) {
			return TestResult.EMPTY;
		}

		let results: TestResult[] = [];
		this._rules.forEach(rule => {
			if (!rule.test(text)) {
				results.push(new TestResult(rule.textConstraint()));
			}
		});
		return results;
	}

	addRule(rule: IRule): void {
		this._rules.push(rule);
	}

	isObsolete(): boolean {
		return this._obsolete;
	}

	get rules(): IRule[] {
		return this._rules;
	}

}

export class TestResult {

	static EMPTY: TestResult[] = [];

	constructor(private _constraint: string) {
		this._constraint = _constraint;
	}

	get constraint(): string {
		return this._constraint;
	}

}

export class Suggestion extends Entity {

	results: TestResult[];

	public discarded: boolean = false;

	constructor(public id: number = null, public label: string = '') {
		super(id);
		this.label = label;
	}

	isValid(): boolean {
		return this.results === undefined || this.results.length === 0;
	}

}
