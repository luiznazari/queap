import { Component } from '@angular/core';
import { HintService } from './hint.service';
import { Hint } from '.././core/models';

@Component({
	moduleId: module.id,
	selector: 'hint-list',
	templateUrl: './hint-list.component.html'
})
export class HintListComponent {

	hints: Hint[];

	constructor(service: HintService) {
		this.hints = service.list();
	}

}
