import { Component, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { componentUtils } from '../.././core/utils';

@Component({
	moduleId: module.id,
	selector: 'panel',
	templateUrl: './panel.component.html'
})
export class PanelComponent implements AfterViewInit {

	_id: string;
	_router: Router;

	@Input() fullscreen: boolean = false;
	@Input() openOnLoad: boolean = false;
	@Input() title: string = '';
    @Input() returnLink: string = '';
    @Input() disabled: boolean = false;
	@Input() showDelete: boolean = false;

	@Input() deleteTitle: string = 'Excluir registro';
	@Input() deleteMessage: string = 'Tem certeza que deseja excluir?';

    @Output() onConfirm = new EventEmitter();
	@Output() onDelete = new EventEmitter();

	constructor(router: Router) {
		this._id = componentUtils.generateId();
		this._router = router;
	}

    doConfirm() {
		this.onConfirm.emit();
		this.close();
    }

	doDelete() {
		phonon.confirm(this.deleteMessage, this.deleteTitle, true, 'Sim', 'Cancelar')
			.on('confirm', () => {
				this.onDelete.emit();
				this.close();
			});
	}

	open() {
		phonon.panel('#' + this._id).open();
	}

	close() {
		if (this.returnLink) {
			this._router.navigate([this.returnLink]);
		}
		phonon.panel('#' + this._id).close();
	}

	ngAfterViewInit() {
		this.fullscreen = parseBoolean(this.fullscreen);
		this.openOnLoad = parseBoolean(this.openOnLoad);
		if (this.openOnLoad) {
			this.open();
		}
	}

}
