export class ComponentUtils {

	static generateId(): string {
		return '_' + Math.random().toString(36).substr(2, 9);
	}

}

function isInputFilled(input: HTMLInputElement) {
	let parent = input.parentElement;
	if (input.value.trim() !== '' && !parent.classList.contains('input-filled')) {
		parent.classList.add('input-filled');
	} else {
		parent.classList.remove('input-filled');
	}
}

export class FormUtils {

	static bindInputWithLabels(container: NodeSelector) {
		let inputs = container.querySelectorAll('input.with-label');
		Array.prototype.forEach.call(inputs, (input: HTMLInputElement) => {
			isInputFilled(input);
			input.addEventListener('focusout', () => isInputFilled(input));
		});
	}

	private constructor() {
		Object.freeze(this);
	}

}

export class StringUtils {

	static capitalize(text: string) {
		return text.charAt(0).toUpperCase() + text.substr(1, text.length);
	}

	static isNumber<V>(value: V): boolean {
		return !isNaN(Number(value));
	}

	private constructor() {
		Object.freeze(this);
	}

}
