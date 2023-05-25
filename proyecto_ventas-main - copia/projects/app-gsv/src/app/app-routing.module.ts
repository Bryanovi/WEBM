import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosModule } from './productos/productos.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'cliente',
    loadChildren: () =>
      import('./clientes/clientes.module').then((m) => m.ClientesModule),
  },
  {
    path: 'producto',
    loadChildren: () =>
      import('./productos/productos.module').then((m) => m.ProductosModule),
  },
  {
    path: 'vendedor',
    loadChildren: () =>
      import('./vendedores/vendedores.module').then((m) => m.VendedoresModule),
  },
  {
    path: 'venta',
    loadChildren: () =>
      import('./ventas/ventas.module').then((m) => m.VentasModule),
  },
  {
    path: 'caja',
    loadChildren: () =>
      import('./cajas/cajas.module').then((m) => m.CajasModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
