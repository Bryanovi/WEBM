import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CajasRoutingModule } from './cajas-routing.module';
import { PageListComponent } from './pages/page-list/page-list.component';
import { SharedModule } from '../shared/shared.module';
import { SaleTableComponent } from './components/sale-table/sale-table.component';

@NgModule({
  declarations: [PageListComponent, SaleTableComponent],
  imports: [CommonModule, CajasRoutingModule, SharedModule],
  exports: [
    SaleTableComponent
  ],
})
export class CajasModule {}
