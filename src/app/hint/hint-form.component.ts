import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Validators, ValidatorFn, FormGroup, FormArray, FormBuilder, AbstractControl } from '@angular/forms';
import { HintService } from './hint.service';
import { Hint, EnumHintConstraint, EnumHintPattern, HintRule } from '.././core/models';

@Component({
	moduleId: module.id,
	selector: 'hint-form',
	templateUrl: './hint-form.component.html',
})
export class HintFormComponent implements OnInit {

	hintForm: FormGroup;
 	hint: Hint;
	autoLabel: boolean = false;
	private _hasRules: boolean = false;

	constructor(private _service: HintService, private _route: ActivatedRoute, private _fb: FormBuilder) {
		this._fb = _fb;
		this._route = _route;
		this._service = _service;
	}

	ngOnInit(): void {
		this.hint = new Hint(null);
		this._route.params.subscribe(params => {
			let id = params['id'];
			if (id) {
				this.hint = this._service.find(id);
			}
		});

		this.hintForm = this._fb.group({
			label: [this.hint.label, [this.validateLabel()]],
			autoLabel: [false],
			rules: this._fb.array([])
		});

		this.hint.rules.forEach(rule => this.addRule(rule as HintRule));
	}

	addRule(rule: HintRule) {
		const control = this.hintForm.controls['rules'] as FormArray;
		const newRuleForm = HintFormRuleComponent.newFormGroup(this._fb, rule);
		control.push(newRuleForm);

		newRuleForm.valueChanges.subscribe((/*rule*/) => this.composeLabel());
		this.changeHasRules();
	}

	removeRule(index: number) {
		const control = this.hintForm.controls['rules'] as FormArray;
		control.removeAt(index);

		this.changeHasRules();
	}

	save() {
		let newhint = new Hint(this.hint.id, this.composeLabel());
		this.hintForm.value.rules.forEach((rule: object) => {
			newhint.addRule(Object.assign(rule, HintFormRuleComponent.prototype).submit());
		});
		this._service.save(newhint);
	}

	delete() {
		this._service.delete(this.hint);
	}

	composeLabel() {
		if (this.autoLabel && this._hasRules) {
			let rules = this.hintForm.controls.rules.value as any[];
			let label = '';
			rules.groupBy((rule: any): string => rule.constraint + rule.pattern).forEach((values: any[]) => {
				let hp = EnumHintPattern.valueOf(values[0].pattern);
				let hc = EnumHintConstraint.valueOf(values[0].constraint);
				let text = values
					.map(rule => rule.text)
					.reduce((accumulator, current) => accumulator + ', ' + current);
				label = concatText(label, new HintRule(hc, hp, text).textConstraint(), '; ');
			});
			return label + '.';
		}

		return this.hintForm.controls.label.value;
	}

	toggleAutoLabel() {
		if (this.autoLabel) {
			// Cache the old label.
			this.hint.label = this.hintForm.controls.label.value;
		}
		this.hintForm.controls.label.updateValueAndValidity();
	}

	private changeHasRules() {
		this._hasRules = this.hintForm.controls.rules.value.length > 0;
		this.hintForm.controls.label.updateValueAndValidity();
	}

	private validateLabel(): ValidatorFn {
		return (control: AbstractControl): {[key: string]: any} => {
			const label = control.value;
			const hasLabel = label !== undefined && label !== '';
			return hasLabel || (this.autoLabel && this._hasRules)  ? null : { forbiddenName: {label} };
		};
	}

}

function concatText(actual: string, next: string, separator: string): string {
	if (next !== '') {
		return (actual !== '' ? (actual + separator) : '') + next;
	}
	return '';
}

@Component({
	moduleId: module.id,
	selector: 'hint-form-rule',
	templateUrl: './hint-form-rule.component.html',
})
export class HintFormRuleComponent {

	static newFormGroup(_fb: FormBuilder, rule: HintRule) {
		rule = rule || new HintRule(EnumHintConstraint.ALL, EnumHintPattern.CONTAINS, '');
		return _fb.group({
			text: [rule.text, [Validators.required, Validators.minLength(1)]],
			pattern: [rule.pattern.name, [Validators.required]],
			constraint: [rule.constraint.name, [Validators.required]],
		});
	}

	// TODO rever como tornar estático.
	constraints = EnumHintConstraint.values;
	patterns = EnumHintPattern.values;

	@Input()
	index: number;
	@Input('group')
	hintRuleForm: FormGroup;
	@Output()
	onDelete = new EventEmitter();

	text: string;
	pattern: string;
	constraint: string;

	submit(): HintRule {
		let hp = EnumHintPattern.valueOf(this.pattern);
		let hc = EnumHintConstraint.valueOf(this.constraint);
		return new HintRule(hc, hp, this.text);
	}

	doDelete(event: Event) {
		event.stop();
		this.onDelete.emit(this.index);
	}

}
