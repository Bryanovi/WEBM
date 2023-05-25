import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { MetaDataColumn } from '../../../shared/interfaces/metadatacolumn.interface';
import { KeypadButton } from '../../../shared/interfaces/keypadButton.interface';
import Swal from 'sweetalert2';
import { ProductoService } from '../../services/producto.service';
@Component({
  selector: 'gsv-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css'],
})
export class PageListComponent {
  registros: any[] = [
    {
      _id: 1,
      marca: 'Xiaomi',
      descripcion: 'i7 10Gen, 8ram, 15.6, 256ssd',
      precio: '12',
      image: '740',
    },
    {
      _id: 2,
      marca: 'Samsung',
      descripcion: 'AMD Ryzen 5, 8ram, 15.6, 256ssd',
      precio: '5',
      image: '700',
    },
    {
      _id: 3,
      marca: 'Iphone',
      descripcion: ' 10th Gen, 2022, 256GB',
      precio: '15',
      image: '350',
    },
    {
      _id: 4,
      producto: 'Infinix',
      descripcion: 'Infinix',
      precio: '15',
      image: '350',
    },
  ];
  title: string = 'PRODUCTOS';
  // El formulario es para poder abrir o cerrar el componente form
  formulario!: boolean;

  fila!: any;

  metaDataColumns: MetaDataColumn[] = [
    { field: '_id', title: 'ID' },
    { field: 'marca', title: 'MARCA' },
    { field: 'descripcion', title: 'DESCRIPCIÓN' },
    { field: 'precio', title: 'PRECIO' },
    { field: 'image', title: 'IMAGE' },
  ];

  keypadButtons: KeypadButton[] = [
    { icon: 'fa-solid fa-plus', color: 'btn-info', accion: 'NUEVO' },
  ];

  data: any[] = [];
  totalRegistros = this.data.length;

  constructor(private productoService: ProductoService) {
    this.cargarProductos('');
  }

  cargarProductos(buscar: string) {
    // this.data = this.registros;
    // this.totalRegistros = this.data.length;
    // this.changePage(0);

    this.productoService.cargarProductos().subscribe((dataWeb) => {
      this.registros = dataWeb;
      if (buscar) {
        console.log(buscar);
        this.registros = this.registros.filter((registro) =>
          registro.producto.toLowerCase().includes(buscar.toLowerCase())
        );
        console.log(this.registros);
      }
      this.totalRegistros = this.registros.length;
      this.changePage(0);
    });
  }
  changePage(page: number) {
    const pageSize = environment.PAGE_SIZE;
    const salto = pageSize * page;
    this.data = this.registros.slice(salto, salto + pageSize);
  }
  enviarAccion(accion: string) {
    switch (accion) {
      case 'NUEVO':
        this.formulario = true;
        this.abrirFormulario();
        break;
    }
  }

  accionEditar(row: any) {
    this.formulario = true;
    console.log(row);
    this.abrirFormulario(row);
  }

  accionEliminar(id: any) {
    console.log('Entro a pagelis');
    this.productoService.eliminarProducto(id).subscribe(() => {
      this.cargarProductos('');
    });
  }

  buscarData(searchData: any) {
    console.log(searchData);
    this.cargarProductos(searchData.terminoBusqueda);
  }

  grabarFormulario(formData: any) {
    if (!formData) {
      this.formulario = false;
      return;
    }
    if (formData.id) {
      const producto = { ...formData, _id: formData.id };
      this.productoService
        .actualizarProducto(formData.id, producto)
        .subscribe(() => {
          this.cargarProductos('');
          this.formulario = false;
          this.mostrarMensajeActualizacion();
        });
    } else {
      const producto = { ...formData };
      this.productoService.registrarProducto(producto).subscribe(() => {
        console.log('Dentro regsitrar');
        console.log(producto);
        this.cargarProductos('');
        this.formulario = false;
        this.mostrarMensajeAñadir();
      });
    }
  }

  abrirFormulario(fila: any = null) {
    console.log('entro al abrir formulario producto');
    this.fila = fila;
  }

  cerrarFormulario() {
    this.formulario = false;
  }

  mostrarMensajeActualizacion(): void {
    Swal.fire({
      title: '¡Productos han sido actualizados!',
      icon: 'info',
      timer: 3000,
      showConfirmButton: false,
    });
  }

  mostrarMensajeAñadir(): void {
    Swal.fire({
      title: 'Registro añadido',
      icon: 'info',
      timer: 3000,
      showConfirmButton: false,
    });
  }
}
