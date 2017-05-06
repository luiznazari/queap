import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PanelComponent } from './panel/panel.component';
import { DialogComponent } from './dialog/dialog.component';
import { SortPipe } from './pipes/sort.pipe';

@NgModule({
    imports: [ CommonModule, RouterModule ],
    declarations: [ SortPipe, PanelComponent, DialogComponent ],
    exports : [ SortPipe, PanelComponent, DialogComponent ],
})
export class ComponentsModule { }
