export class EnumValue {

	constructor(private _name: string = null) {
		this._name = _name;
	}

	get name() {
		return this._name;
	}

	setName(name: string): void {
		this._name = name;
	}

	get value(): string {
		return this._name;
	}

}

function generateEnumValuesFor<F>(enumObject: any): F[] {
	let values = [];
	for (let prop in enumObject) {
		if (enumObject.hasOwnProperty(prop) && enumObject[prop.toString()] instanceof EnumValue) {
			let enumValue = enumObject[prop.toString()];
			enumValue.setName(prop);
			values.push(enumValue);
		}
	}
	return values;
}

export class Enum<T> {

	static create<E, F extends EnumValue>(enumObject: E, enumValueObject: F): Readonly<E & Enum<F>> {
		enumValueObject.toString(); // remove unused warning.
		let newEnumObject = Object.assign(new Enum<F>(), enumObject);
		newEnumObject._setValues(generateEnumValuesFor<F>(enumObject));
		return Object.freeze(newEnumObject);
	}

	private _values: T[];

	get values(): T[] {
		return this._values;
	}

	valueOf(name: string): T {
		return this[name];
	}

	private _setValues(values: T[]): void {
		this._values = values;
	}

}

export class Entity implements localStorageDB_fields {

	id: number;

	constructor(id: number) {
		this.id = id;
	}

	set ID(id: number) {
		this.id = id;
	}

	get ID(): number {
		return this.id;
	}

}

export interface IRepository<E extends Entity> {

	_serialize(entity: E): object;

	_deserialize(serializedEntity: object): E;

	save(entity: E): E;

	findOne(id: E | number): E;

	find(id: E | number, query?: object): E[];

	delete(id: E | number): number;

}
