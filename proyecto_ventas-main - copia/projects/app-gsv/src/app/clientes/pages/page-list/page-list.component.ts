import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { MetaDataColumn } from '../../../shared/interfaces/metadatacolumn.interface';
import { KeypadButton } from '../../../shared/interfaces/keypadButton.interface';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormComponent } from '../../components/form/form.component';
import Swal from 'sweetalert2';
import { ClienteService } from '../../services/cliente.service';
@Component({
  selector: 'gsv-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css'],
})
export class PageListComponent {
  registros: any[] = [
    {
      _id: 1,
      nombresCompletos: 'Juan Pérez',
      correoElectronico: 'juan.perez@mail.com',
      direccion: 'Av. Quito',
      celular: '0991234567',
    },
    {
      _id: 2,
      nombresCompletos: 'María Gómez',
      correoElectronico: 'maria.gomez@mail.com',
      direccion: 'Av. Guayaquil',
      celular: '0987654321',
    },
    {
      _id: 3,
      nombresCompletos: 'Pedro López',
      correoElectronico: 'pedro.lopez@mail.com',
      direccion: 'Av. Cuenca',
      celular: '0999876543',
    },
    {
      _id: 4,
      nombresCompletos: 'Ana Ramírez',
      correoElectronico: 'ana.ramirez@mail.com',
      direccion: 'Av. Ambato',
      celular: '0987123456',
    },
    {
      _id: 5,
      nombresCompletos: 'Luisa Fernández',
      correoElectronico: 'luisa.fernandez@mail.com',
      direccion: 'Av. Riobamba',
      celular: '0996543210',
    },
    {
      _id: 6,
      nombresCompletos: 'Diego Cevallos',
      correoElectronico: 'diego.cevallos@mail.com',
      direccion: 'Av. Loja',
      celular: '0987654321',
    },
    {
      _id: 7,
      nombresCompletos: 'Sofía Ruiz',
      correoElectronico: 'sofia.ruiz@mail.com',
      direccion: 'Av. Ibarra',
      celular: '0999876543',
    },
    {
      _id: 8,
      nombresCompletos: 'Carlos Castro',
      correoElectronico: 'carlos.castro@mail.com',
      direccion: 'Av. Esmeraldas',
      celular: '0987123456',
    },
  ];
  title: string = 'CLIENTES';
  // El formulario es para poder abrir o cerrar el componente form
  formulario!: boolean;

  fila!: any;

  metaDataColumns: MetaDataColumn[] = [
    { field: '_id', title: 'ID' },
    { field: 'nombresCompletos', title: 'NOMBRES' },
    { field: 'correoElectronico', title: 'CORREO ELECTRÓNICO' },
    { field: 'direccion', title: 'DIRECCION' },
    { field: 'celular', title: 'CELULAR' },
  ];

  keypadButtons: KeypadButton[] = [
    {
      icon: 'fa-solid fa-cloud-arrow-down',
      color: 'btn-success',
      accion: 'download',
    },
    { icon: 'fa-solid fa-plus', color: 'btn-primary', accion: 'NUEVO' },
  ];

  data: any[] = [];
  totalRegistros = this.data.length;

  constructor(private clienteService: ClienteService) {
    this.cargarClientes('');
  }

  cargarClientes(buscar: string) {
    /* this.data = this.registros;
    this.totalRegistros = this.data.length;
    this.changePage(0);*/

    this.clienteService.cargarClientes().subscribe((dataWeb) => {
      this.registros = dataWeb;
      if (buscar) {
        console.log(buscar);
        this.registros = this.registros.filter((registro) =>
          registro.nombresCompletos.toLowerCase().includes(buscar.toLowerCase())
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
      case 'DOWNLOAD':
        break;
      case 'NUEVO':
        this.formulario = true;
        this.abrirFormulario();
        break;
    }
  }

  accionEditar(row: any) {
    this.formulario = true;
    this.abrirFormulario(row);
  }

  accionEliminar(id: any) {
    console.log('Entro a pagelis');
    this.clienteService.eliminarCliente(id).subscribe(() => {
      this.cargarClientes('');
    });
  }

  buscarData(searchData: any) {
    console.log(searchData);
    this.cargarClientes(searchData.terminoBusqueda);
  }

  grabarFormulario(formData: any) {
    if (!formData) {
      this.formulario = false;
      return;
    }
    if (formData.id) {
      const cliente = { ...formData };
      console.log('Entro al ID');
      console.log(cliente);
      this.clienteService
        .actualizarCliente(formData.id, cliente)
        .subscribe(() => {
          this.cargarClientes('');
          this.formulario = false;
          this.mostrarMensajeActualizacion();
        });
    } else {
      const cliente = { ...formData };
      this.clienteService.registrarCliente(cliente).subscribe(() => {
        console.log('Dentro regsitrar');
        console.log(cliente);
        this.cargarClientes('');
        this.formulario = false;
        this.mostrarMensajeAñadir();
      });
    }
  }

  abrirFormulario(fila: any = null) {
    this.fila = fila;
  }

  cerrarFormulario() {
    this.formulario = false;
  }

  mostrarMensajeActualizacion(): void {
    Swal.fire({
      title: 'Registro actulaizado',
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
