import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PanelComponent } from './panel/panel.component';
import { SortPipe } from './pipes/sort.pipe';

@NgModule({
    imports: [ CommonModule, RouterModule ],
    declarations: [ PanelComponent, SortPipe ],
    exports : [ PanelComponent, SortPipe ],
})
export class ComponentsModule { }
