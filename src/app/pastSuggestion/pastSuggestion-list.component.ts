import { Component } from '@angular/core';
import { Suggestion } from '.././core/models';
import { DialogComponent } from '.././components/dialog/dialog.component';
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

	viewSuggestion(id: number, viewSuggestionDialog: DialogComponent) {
		this.activeSuggestion = this.service.find(id);
		viewSuggestionDialog.open();
	}

	redoDiscard(viewSuggestionDialog: DialogComponent) {
		viewSuggestionDialog.close();
		phonon.confirm('Tem certeza que deseja mover para "Sugestões"?', 'Mover sugestão', true, 'Sim', 'Cancelar')
			.on('confirm', () => {
				this.removeActiveSuggestion();
				this.activeSuggestion.discarded = false;
				this.service.save(this.activeSuggestion);
			});
	}

	delete(viewSuggestionDialog: DialogComponent) {
		viewSuggestionDialog.close();
		phonon.confirm('Tem certeza que deseja excluir?', 'Excluir registro', true, 'Sim', 'Cancelar')
			.on('confirm', () => {
				this.service.delete(this.activeSuggestion);
				this.removeActiveSuggestion();
			});
	}

	private removeActiveSuggestion() {
		let index = this.suggestions.findIndex(s => s.id === this.activeSuggestion.id);
		this.suggestions = this.suggestions.splice(index + 1, 1);
	}

}
