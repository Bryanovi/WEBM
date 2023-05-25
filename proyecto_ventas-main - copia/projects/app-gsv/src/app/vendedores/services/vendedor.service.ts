import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vendedor } from '../models/vendedores.model';

@Injectable({
  providedIn: 'root',
})
export class VendedorService {
  url = '/api/vendedores/';
  constructor(private http: HttpClient) {}

  cargarVendedores(): Observable<any> {
    return this.http.get(this.url);
  }

  cargarVendedor(id: string): Observable<any> {
    return this.http.get(this.url + id);
  }

  registrarVendedor(vendedor: Vendedor): Observable<any> {
    return this.http.post(this.url, vendedor);
  }

  actualizarVendedor(id: string, vendedor: Vendedor): Observable<any> {
    return this.http.put(this.url + id, vendedor);
  }

  eliminarVendedor(id: string): Observable<any> {
    return this.http.delete(this.url + id);
  }
}
