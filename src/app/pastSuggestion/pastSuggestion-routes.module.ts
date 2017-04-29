import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PastSuggestionComponent } from './pastSuggestion.component';
import { PastSuggestionListComponent } from './pastSuggestion-list.component';

const routes: Routes = [
	{
		path: 'past-suggestions', component: PastSuggestionComponent, children: [
			{ path: '', component: PastSuggestionListComponent }
		]
	}
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ]
})
export class PastSuggestionRoutingModule { }
