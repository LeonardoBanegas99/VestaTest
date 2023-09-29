import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesGridComponent } from './sales-grid/sales-grid.component';

import { jqxGridModule } from 'jqwidgets-ng/jqxgrid';
import { jqxChartModule } from 'jqwidgets-ng/jqxchart';

import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

const routes = RouterModule.forChild([
  {
    path: '', component: SalesGridComponent,
  }
]);

@NgModule({
  declarations: [
    SalesGridComponent
  ],
  imports: [
    CommonModule,
    jqxGridModule,
    NgSelectModule,
    FormsModule,
    jqxChartModule,
    routes,
  ]
})
export class MainViewModule { }
