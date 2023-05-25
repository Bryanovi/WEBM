import { Component, OnInit, ViewChild } from '@angular/core';
import { PageListComponent as ProductoComponent } from '../../../productos/pages/page-list/page-list.component';
import { PageListComponent as ClienteComponent } from '../../../clientes/pages/page-list/page-list.component';
import { MetaDataColumn } from '../../../shared/interfaces/metadatacolumn.interface';
import { environment } from '../../../environments/environment';
import { ProductoService } from '../../../productos/services/producto.service';
import { Producto } from '../../../productos/models/productos.model';
import { ClienteService } from '../../../clientes/services/cliente.service';
import { VendedorService } from '../../../vendedores/services/vendedor.service';
import { CajaService } from '../../../cajas/services/caja.service';
import Swal from 'sweetalert2';
import { FormUserComponent } from '../../components/form-user/form-user.component';

@Component({
  selector: 'gsv-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css'],
})
export class PageListComponent {
  //Registros array
  registrosProducto: any[] = [];
  registrosClientes: any[] = [];
  registrosVendedores: any[] = [];
  registros: any[] = [];

  //ViewChild
  @ViewChild('formUserRef', { static: false }) formUserRef!: FormUserComponent;

  //validadores booleanos
  validarRegistroUser!: boolean; // Sirve para hacer aparecer el form-productos
  validarRegistroProduct!: boolean;

  metaDataColumns: MetaDataColumn[] = [
    // { field: '_id', title: 'ID' },
    { field: 'producto', title: 'PRODUCTO' },
    { field: 'cantidad', title: 'CANTIDAD' },
    { field: 'subtotal', title: 'SUBTOTAL' },
  ];

  data: any[] = [];
  totalRegistros = this.data.length;
  registroUsuarioVenta!: any;

  constructor(
    private productoService: ProductoService,
    private clienteService: ClienteService,
    private vendedorService: VendedorService,
    private cajaService: CajaService
  ) {
    this.cargarRegistroProducto();
    this.cargarRegistroVenta();
    this.cargarRegistroVendedor();
    this.cargarRegistroCliente();
    this.validarRegistroUser = false;
    this.validarRegistroProduct = false;
  }
  cargarRegistroVendedor() {
    this.vendedorService.cargarVendedores().subscribe((dataWeb) => {
      this.registrosVendedores = dataWeb;
    });
  }
  cargarRegistroCliente() {
    this.clienteService.cargarClientes().subscribe((dataWeb) => {
      this.registrosClientes = dataWeb;
    });
  }
  cargarRegistroProducto() {
    this.productoService.cargarProductos().subscribe((dataWeb) => {
      this.registrosProducto = dataWeb;
      console.log('Registro producto', this.registrosProducto); // imprime los registros correctamente
    });
  }

  cargarRegistroVenta() {
    this.data = this.registros;
    this.totalRegistros = this.data.length;
    this.validarRegistroProduct = this.totalRegistros > 0 ? true : false;
    this.changePage(0);
  }

  changePage(page: number) {
    const pageSize = environment.PAGE_SIZE;
    const salto = pageSize * page;
    this.data = this.registros.slice(salto, salto + pageSize);
  }

  // Metodo para guardar el registro de la factura
  grabarFormulario(formData: any) {
    const venta = {
      producto: formData.producto,
      cantidad: formData.cantidad,
      subtotal: formData.precio * formData.cantidad,
    };

    const producto = {
      producto: formData.producto,
      descripcion: formData.descripcion,
      stock: formData.stock - formData.cantidad,
      precio: formData.precio,
    };
    console.log(venta);
    //metodo para actualizar el stock del producto
    this.actualizarRegistroProducto(formData._id, producto);
    // se agrega el producto - venta al array estatico: this.registros
    this.registros.push(venta);
    //se cargar la tabla de ventas de productos
    this.cargarRegistroVenta();
  }

  // actualiza el stock de la tabla producto al agregar un producto
  actualizarRegistroProducto(id: string, producto: any) {
    this.productoService.actualizarProducto(id, producto).subscribe(() => {
      this.cargarRegistroProducto();
    });
  }

  // Aqui se graba los usuarios en un array : this.registroUsuarioVenta y se toma el valor del method grabarUser register del Form
  grabarUserRegister(formData: any) {
    this.registroUsuarioVenta = formData;
    if (!this.registroUsuarioVenta) {
      return;
    }
    this.validarRegistroUser = true;
    console.log(this.registroUsuarioVenta);
  }

  cambiarEstadoDelValidarRegistro() {
    this.validarRegistroUser = false;
    console.log('entro');
  }

  setVenta() {
    this.registrarVenta(this.registroUsuarioVenta, this.registros);
  }

  //Se registra la venta y se guarda en la tabla caja.
  registrarVenta(userRegister: any, registroVenta: any) {
    //Obtener el total venta. Sumatoria de todo el subtotal
    let totalSubtotal = this.registros.reduce((total, registro) => {
      return total + registro.subtotal;
    }, 0);
    console.log(totalSubtotal);

    const caja = {
      cliente: this.registroUsuarioVenta.cliente,
      vendedor: this.registroUsuarioVenta.vendedor,
      total: totalSubtotal,
    };
    this.cajaService.registrarCaja(caja).subscribe(() => {
      this.registros = [];
      this.cargarRegistroVenta();
      this.mostrarMensajeVenta(caja);
      this.cargarRegistroCliente();
      this.cargarRegistroVendedor();
      this.limpiarFormulario();
      this.validarRegistroUser = false;
    });
  }

  limpiarFormulario() {
    if (this.formUserRef) {
      this.formUserRef.limpiarFormulario();
    }
  }
  //Mensajes:
  mostrarMensajeVenta(caja: any) {
    Swal.fire({
      icon: 'info',
      title: 'Detalles de la transacción',
      html: `
      <strong>Cliente:</strong> ${caja.cliente}<br>
    <strong>Vendedor:</strong> ${caja.vendedor}<br>
    <strong>Monto total:</strong> ${caja.total}
      <p>Revisar en el modulo de caja</p>
    `,
      confirmButtonText: 'Aceptar',
    });
  }
}

interface Registro {
  _id: number;
  producto: string;
  stock: number;
  precio: number;
}
