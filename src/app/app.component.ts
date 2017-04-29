import { Component } from '@angular/core';
import { DataBase } from './core/persistence';

@Component({
	moduleId: module.id,
	selector: 'app',
	templateUrl: './app.component.html'
})
export class AppComponent {

	constructor() {
		log.info('[AppComponent] Starting database migration...');
		let migrated = DataBase.migrate();
		if (migrated) {
			log.info('[AppComponent] Database migrated successfully.');
		} else {
			log.info('[AppComponent] Nothing to migrate.');
		}
	}

}
