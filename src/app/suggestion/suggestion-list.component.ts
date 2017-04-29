import { Component } from '@angular/core';
import { SuggestionService } from './suggestion.service';
import { Suggestion } from '.././core/models';

@Component({
	moduleId: module.id,
	selector: 'suggestion-list',
	templateUrl: './suggestion-list.component.html'
})
export class SuggestionListComponent {

	suggestions: Suggestion[];
	service: SuggestionService;

	constructor(service: SuggestionService) {
		this.service = service;
		this.suggestions = this.service.list();
	}

	delete(suggestion: Suggestion) {
		this.service.delete(suggestion);
	}

}
