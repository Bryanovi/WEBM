import { Component } from '@angular/core';
import { MetaDataColumn } from '../../../shared/interfaces/metadatacolumn.interface';
import { environment } from '../../../environments/environment';
import { CajaService } from '../../services/caja.service';

@Component({
  selector: 'gsv-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css'],
})
export class PageListComponent {
  registros: any[] = [];
  metaDataColumns: MetaDataColumn[] = [
    // { field: '_id', title: 'ID' },
    { field: 'cliente', title: 'CLIENTE' },
    { field: 'vendedor', title: 'VENDEDOR' },
    { field: 'fechaCreacion', title: 'FECHA DE CREACION' },
    { field: 'total', title: 'MONTO' },
  ];

  data: any[] = [];
  totalRegistros = this.data.length;

  constructor(private cajaService: CajaService) {
    this.cargarRegistroCaja();
  }

  cargarRegistroCaja() {
    this.cajaService.cargarCajas().subscribe((dataWeb) => {
      this.registros = dataWeb;
      this.totalRegistros = this.registros.length;
      this.changePage(0);
    });
  }

  changePage(page: number) {
    const pageSize = environment.PAGE_SIZE;
    const salto = pageSize * page;
    this.data = this.registros.slice(salto, salto + pageSize);
  }
}
