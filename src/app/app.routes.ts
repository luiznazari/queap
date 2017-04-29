import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{ path: '', redirectTo: 'suggestions', pathMatch: 'full' },
	{ path: 'suggestions', loadChildren: 'app/suggestion/suggestion.module#SuggestionModule' },
	{ path: 'hints', loadChildren: 'app/hint/hint.module#HintModule' },
	{ path: 'past-suggestions', loadChildren: 'app/pastSuggestion/pastSuggestion.module#PastSuggestionModule' },
	{ path: '**', redirectTo: 'suggestions' }
];

export const routing = RouterModule.forRoot(routes);
