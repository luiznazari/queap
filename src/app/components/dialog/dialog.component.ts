import { Component, Input } from '@angular/core';
import { AbstractComponent } from '.././components.model';

@Component({
	moduleId: module.id,
	selector: 'dialog-window',
	templateUrl: './dialog.component.html'
})
export class DialogComponent extends AbstractComponent {

	@Input() title: string;

	open() {
		phonon.dialog('#' + this._id).open();
	}

	close() {
		phonon.dialog('#' + this._id).close();
	}

}
