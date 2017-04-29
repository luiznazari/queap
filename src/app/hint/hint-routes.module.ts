import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HintComponent } from './hint.component';
import { HintFormComponent } from './hint-form.component';
import { HintListComponent } from './hint-list.component';

const routes: Routes = [
	{
		path: 'hints', component: HintComponent, children: [
			{ path: '', component: HintListComponent },
			{ path: 'new', component: HintFormComponent },
			{ path: ':id', component: HintFormComponent }
		]
	}
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ]
})
export class HintRoutingModule { }
