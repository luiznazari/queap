import { ComponentUtils } from '.././core/utils';

export abstract class AbstractComponent {

	private identifier: string;

	constructor() {
		this.identifier = ComponentUtils.generateId();
	}

	public get _id(): string {
		return this.identifier;
	}

}
