import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuggestionService } from '.././suggestion/suggestion.service';
import { PastSuggestionComponent } from './pastSuggestion.component';
import { PastSuggestionRoutingModule } from './pastSuggestion-routes.module';
import { PastSuggestionListComponent } from './pastSuggestion-list.component';
import { ComponentsModule } from '.././components/components.module';

@NgModule({
	imports: [ CommonModule, ComponentsModule, PastSuggestionRoutingModule ],
	declarations: [ PastSuggestionComponent, PastSuggestionListComponent ],
	providers: [ SuggestionService ]
})
export class PastSuggestionModule { }
