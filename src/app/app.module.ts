import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { routing } from './app.routes';
import { AppComponent } from './app.component';
import { HintModule } from './hint/hint.module';
import { ComponentsModule } from './components/components.module';
import { SuggestionModule } from './suggestion/suggestion.module';
import { PastSuggestionModule } from './pastSuggestion/pastSuggestion.module';
import 'rxjs/add/operator/map';

@NgModule({
	imports: [ BrowserModule, HttpModule, routing, ComponentsModule, HintModule, SuggestionModule, PastSuggestionModule ],
	declarations: [ AppComponent ],
	bootstrap: [ AppComponent ]
})
export class AppModule { }
