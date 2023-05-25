import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/productos.model';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  url = '/api/productos/';
  constructor(private http: HttpClient) {}

  cargarProductos(): Observable<any> {
    return this.http.get(this.url);
  }

  cargarProducto(id: string): Observable<any> {
    return this.http.get(this.url + id);
  }

  registrarProducto(producto: Producto): Observable<any> {
    return this.http.post(this.url, producto);
  }

  actualizarProducto(id: string, producto: Producto): Observable<any> {
    return this.http.put(this.url + id, producto);
  }

  eliminarProducto(id: string): Observable<any> {
    return this.http.delete(this.url + id);
  }
}
