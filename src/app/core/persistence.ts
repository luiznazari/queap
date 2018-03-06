import { Entity, IRepository } from './types';
import { Suggestion, Hint, HintRule, EnumHintPattern, EnumHintConstraint } from './models';
import { StringUtils } from './utils';

function findElementsNotInArray(array: string[], anotherArray: string[]): string[] {
	let diffFields: string[] = [];
	array.forEach(element => {
		if (!anotherArray.some(currentElement => currentElement === element)) {
			diffFields.push(element);
		}
	});
	return diffFields;
}

interface IField {

	name: string;
	defaultValue: any;

}

function field(fieldName: string, fieldDefaultValue?: any): IField {
	return {
		name: fieldName,
		defaultValue: fieldDefaultValue,
	};
}

export class DataBase {

	static get db(): localStorageDB {
		return DataBase._db;
	}

	static migrate(): boolean {
		// Get or create DB.
		this._db = new localStorageDB(DataBase.DB_NAME, window.localStorage);

		let changed = this.db.isNew();

		this._tables.forEach(table => changed = this.migrateTable(table.name, table.fields) ? true : changed);
		this._droppedTableNames.forEach(table => changed = this.dropTable(table) ? true : changed);

		if (changed) {
			this.db.commit();
		}
		return changed;
	}

	private static DB_NAME: string = 'queap';

	private static _db: localStorageDB;

	private static _tables = [{
		name: 'suggestion',
		fields: [field('label'), field('discarded', false)]
	}, {
		name: 'hint',
		fields: [field('label'), field('rules')]
	}];

	private static _droppedTableNames: string[] = [];

	private static migrateTable(tableName: string, fields: IField[]): boolean {
		let tableChanged = false;

		if (!this.db.tableExists(tableName)) {
			tableChanged = true;
			this.db.createTable(tableName, fields.map(f => f.name));
		} else {
			let currentFields = this.db.tableFields(tableName);
			let missingFields = findElementsNotInArray(fields.map(f => f.name), currentFields);

			if (missingFields.length > 0) {
				tableChanged = true;
				let defaults = missingFields.map(missingField => {
					let d = {};
					d[missingField] = fields.find(f => f.name === missingField).defaultValue;
					return d;
				});
				this.db.alterTable(tableName, missingFields, defaults);
			}
		}

		return tableChanged;
	}

	private static dropTable(tableName: string): boolean {
		if (this.db.tableExists(tableName)) {
			this.db.dropTable(tableName);
			return true;
		}
		return false;
	}

}

// TODO: rever como criar decorators
// export function Transactional() {
// 	return function(target: object, propertyKey: string, descriptor: PropertyDescriptor) {
// 		target[propertyKey] = function(args: object) {
// 			descriptor.value(args);
// 			if (DataBase.db) {
// 				DataBase.db.commit();
// 				console.log(`${target} commited`);
// 			}
// 		};
// 	}
// }

abstract class AbstractLocalStorageRepository<E extends Entity> implements IRepository<E> {

	constructor(protected tableName: string) {
		// Cannot rely on Type's prototype's names to determine the table name
		// because it changes on minification.
		this.tableName = tableName;
	}

	abstract _serialize(entity: E): any;

	abstract _deserialize(serializedEntity: any): E;

	// @Transactional()
	save(entity: E): E {
		let newId = DataBase.db.insertOrUpdate(this.tableName, this.queryId(entity.id), this._serialize(entity));
		entity.id = newId;
		DataBase.db.commit();
		return entity;
	}

	findOne(id: E | number): E {
		if (!id) {
			return null;
		}

		let result = this.find(id);
		if (result.length > 1) {
			throw new Error('More than one element returned!');
		} else if (result.length === 0) {
			return null;
		} else {
			return result[0];
		}
	}

	findAll(): E[] {
		return this.deserializeResult(DataBase.db.queryAll(this.tableName, undefined));
	}

	find(query: E | number | localStorageDB_dynamicFields): E[] {
		if (query instanceof Entity) {
			query = { query: this.queryId((query as Entity).id) };
		} else if (StringUtils.isNumber(query)) {
			query = { query: this.queryId(query as number) };
		}
		return this.deserializeResult(DataBase.db.queryAll(this.tableName, (query as localStorageDB_dynamicFields)));
	}

	// @Transactional()
	delete(id: E | number): number {
		let deletedId = DataBase.db.deleteRows(this.tableName, this.queryId(id));
		DataBase.db.commit();
		return deletedId;
	}

	protected deserializeResult(results: localStorageDB_dynamicFields[]): E[] {
		return results.map(result => {
			return this._deserialize(result);
		});
	}

	protected queryId(entityId: E | number): { [T: string]: any } {
		let id = entityId instanceof Entity ? entityId.id : entityId;
		return { ID: id };
	}

}

export class SuggestionRepository extends AbstractLocalStorageRepository<Suggestion> {

	constructor() {
		super('suggestion');
	}

	_serialize(entity: Suggestion) {
		return {
			ID: entity.id,
			label: entity.label,
			discarded: entity.discarded,
		};
	}

	_deserialize(serializedEntity: any): Suggestion {
		let suggestion = new Suggestion(serializedEntity.ID, serializedEntity.label);
		suggestion.discarded = serializedEntity.discarded;
		return suggestion;
	}

}

export class HintRepository extends AbstractLocalStorageRepository<Hint> {

	constructor() {
		super('hint');
	}

	_serialize(entity: Hint) {
		let rulesList = entity.rules.map((rule: any) => this._serializeRule(rule));
		return {
			ID: entity.id,
			label: entity.label,
			rules: rulesList
		};
	}

	_deserialize(serializedEntity: any): Hint {
		let hint = new Hint(serializedEntity.ID, serializedEntity.label);
		if (serializedEntity.rules) {
			serializedEntity.rules.forEach((rule: any) => hint.addRule(this._deserializeRule(rule)));
		}
		return hint;
	}

	_serializeRule(entity: HintRule) {
		return {
			ID: entity.id,
			text: entity.text,
			pattern: entity.pattern.name,
			constraint: entity.constraint.name,
		};
	}

	_deserializeRule(serializedEntity: any): HintRule {
		let hp = EnumHintPattern.valueOf(serializedEntity.pattern);
		let hc = EnumHintConstraint.valueOf(serializedEntity.constraint);
		return new HintRule(hc, hp, serializedEntity.text);
	}

}
