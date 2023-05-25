import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VentasRoutingModule } from './ventas-routing.module';
import { PageListComponent } from './pages/page-list/page-list.component';
import { FormComponent } from './components/form/form.component';
import { SharedModule } from '../shared/shared.module';

import { SaleTableComponent } from './components/sale-table/sale-table.component';
import { FormUserComponent } from './components/form-user/form-user.component';

@NgModule({
  declarations: [PageListComponent, FormComponent, SaleTableComponent, FormUserComponent],
  imports: [CommonModule, VentasRoutingModule, SharedModule],
  exports: [SaleTableComponent],
})
export class VentasModule {}
