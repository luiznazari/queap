import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HintComponent } from './hint.component';
import { HintService } from './hint.service';
import { HintRoutingModule } from './hint-routes.module';
import { HintFormComponent, HintFormRuleComponent } from './hint-form.component';
import { HintListComponent } from './hint-list.component';
import { ComponentsModule } from '.././components/components.module';

@NgModule({
	imports: [ CommonModule, FormsModule, ReactiveFormsModule, ComponentsModule, HintRoutingModule ],
	declarations: [ HintComponent, HintFormComponent, HintListComponent, HintFormRuleComponent ],
	exports: [ HintComponent ],
	providers: [ HintService ]
})
export class HintModule { }
