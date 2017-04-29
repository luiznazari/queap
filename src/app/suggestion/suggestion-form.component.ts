import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SuggestionService } from './suggestion.service';
import { Suggestion } from '.././core/models';

@Component({
	moduleId: module.id,
	selector: 'suggestion-form',
	templateUrl: './suggestion-form.component.html',
})
export class SuggestionFormComponent implements OnInit {

	_service: SuggestionService;
	_route: ActivatedRoute;

	@Input() suggestion: Suggestion;

	constructor(service: SuggestionService, route: ActivatedRoute) {
		this._service = service;
		this._route = route;
	}

	ngOnInit() {
		this.suggestion = new Suggestion();
		this._route.params.subscribe(params => {
			let id = params['id'];
			if (id) {
				this.suggestion = this._service.find(id);
			}
		});
		this.executeHints();
	}

	save() {
		this._service.save(this.suggestion);
	}

	discard() {
		this.suggestion.discarded = true;
		this._service.save(this.suggestion);
	}

	executeHints() {
		this._service.validateSuggestion(this.suggestion);
	}

}
