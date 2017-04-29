import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuggestionComponent } from './suggestion.component';
import { SuggestionFormComponent } from './suggestion-form.component';
import { SuggestionListComponent } from './suggestion-list.component';

const routes: Routes = [
	{
		path: 'suggestions', component: SuggestionComponent, children: [
			{ path: '', component: SuggestionListComponent },
			{ path: 'new', component: SuggestionFormComponent },
			{ path: ':id', component: SuggestionFormComponent }
		]
	}
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ]
})
export class SuggestionRoutingModule { }
