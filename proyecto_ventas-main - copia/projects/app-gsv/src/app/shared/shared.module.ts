import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from './components/title/title.component';
import { TableComponent } from './components/table/table.component';
import { MatTableModule } from '@angular/material/table';
import { ContainerComponent } from './components/container/container.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { KeypadButtonComponent } from './components/keypad-button/keypad-button.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SearchComponent } from './components/search/search.component';

@NgModule({
  declarations: [
    TitleComponent,
    TableComponent,
    ContainerComponent,
    PaginatorComponent,
    KeypadButtonComponent,
    SearchComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    ReactiveFormsModule,
    MatPaginatorModule,
  ],
  exports: [
    TitleComponent,
    TableComponent,
    MatTableModule,
    ContainerComponent,
    PerfectScrollbarModule,
    PaginatorComponent,
    KeypadButtonComponent,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    SearchComponent,
  ],
})
export class SharedModule {}
