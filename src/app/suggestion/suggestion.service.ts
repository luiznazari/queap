import { Injectable } from '@angular/core';
import { HintService } from '.././hint/hint.service';
import { Suggestion, TestResult } from '.././core/models';
import { SuggestionRepository } from '.././core/persistence';

@Injectable()
export class SuggestionService {

	private repository: SuggestionRepository;

	constructor(private hintService: HintService) {
		this.repository = new SuggestionRepository();
		this.hintService = hintService;
	}

	list(): Suggestion[] {
		let suggestions = this.repository.find({
			query: { discarded: false }
		});
		this.validateSuggestions(suggestions);
		return suggestions;
	}

	listDiscarded(): Suggestion[] {
		return this.repository.find({
			query: { discarded: true }
		});
	}

	save(suggestion: Suggestion) {
		this.repository.save(suggestion);
	}

	find(id: number): Suggestion {
		return this.repository.findOne(id);
	}

	delete(suggestion: Suggestion) {
		this.repository.delete(suggestion);
	}

	public validateSuggestion(suggestion: Suggestion): void {
		this.validateSuggestions([ suggestion ]);
	}

	public validateSuggestions(suggestions: Suggestion[]): void {
		suggestions.forEach(s => {
			let results: TestResult[] = [];
			this.hintService.list().forEach(hint => results = results.concat(hint.test(s.label)));
			s.results = results;
		});
	}

}
