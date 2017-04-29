import { Component } from '@angular/core';
import { Suggestion } from '.././core/models';
import { PanelComponent } from '.././components/panel/panel.component';
import { SuggestionService } from '.././suggestion/suggestion.service';

@Component({
	moduleId: module.id,
	selector: 'past-suggestion-list',
	templateUrl: './pastSuggestion-list.component.html'
})
export class PastSuggestionListComponent {

	service: SuggestionService;
	suggestions: Suggestion[];
	activeSuggestion: Suggestion;

	constructor(service: SuggestionService) {
		this.service = service;
		this.suggestions = this.service.listDiscarded();
	}

	viewSuggestion(id: number, viewSuggestionPanel: PanelComponent) {
		this.activeSuggestion = this.service.find(id);
		viewSuggestionPanel.open();
	}

	redoDiscard(viewSuggestionPanel: PanelComponent) {
		phonon.confirm('Tem certeza que deseja mover para "Sugestões"?', 'Mover sugestão', true, 'Sim', 'Cancelar')
			.on('confirm', () => {
				this.removeActiveSuggestion();
				this.activeSuggestion.discarded = false;
				this.service.save(this.activeSuggestion);
				viewSuggestionPanel.close();
			});
	}

	delete() {
		this.service.delete(this.activeSuggestion);
		this.removeActiveSuggestion();
	}

	private removeActiveSuggestion() {
		let index = this.suggestions.findIndex(s => s.id === this.activeSuggestion.id);
		this.suggestions = this.suggestions.splice(index + 1, 1);
	}

}
