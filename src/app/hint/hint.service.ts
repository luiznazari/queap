import { Injectable } from '@angular/core';
import { HintRepository } from '.././core/persistence';
import { Hint } from '.././core/models';

@Injectable()
export class HintService {

	// hints: Hint[] = [
	// 	new Hint('1', 'A última palavra termina com "Sif"; A quarta palavra é igual a "Sif".')
	// ];

	// constructor() {
	// 	this.hints[0].addRule(new HintRule(EnumHintConstraint.LAST_WORD, EnumHintPattern.ENDS_WITH, 'Sif'));
	// 	this.hints[0].addRule(new HintRule(EnumHintConstraint.FORTH_WORD, EnumHintPattern.EQUALS_TO, 'Sif'));
	// }

	private repository: HintRepository;

	constructor() {
		this.repository = new HintRepository();
	}

	list(): Hint[] {
		return this.repository.findAll();
	}

	save(hint: Hint) {
		this.repository.save(hint);
	}

	find(id: number): Hint {
		return this.repository.findOne(id);
	}

	delete(hint: Hint) {
		this.repository.delete(hint);
	}

}
