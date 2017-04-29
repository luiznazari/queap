import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SuggestionService } from './suggestion.service';
import { SuggestionComponent } from './suggestion.component';
import { SuggestionRoutingModule } from './suggestion-routes.module';
import { SuggestionFormComponent } from './suggestion-form.component';
import { SuggestionListComponent } from './suggestion-list.component';
import { ComponentsModule } from '.././components/components.module';

@NgModule({
	imports: [ CommonModule, FormsModule, ComponentsModule, SuggestionRoutingModule ],
	declarations: [ SuggestionComponent, SuggestionFormComponent, SuggestionListComponent ],
	providers: [ SuggestionService ]
})
export class SuggestionModule { }
