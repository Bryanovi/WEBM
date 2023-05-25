import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../models/clientes.model';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  url = '/api/clientes/';
  constructor(private http: HttpClient) {}

  cargarClientes(): Observable<any> {
    return this.http.get(this.url);
  }

  cargarCliente(id: string): Observable<any> {
    return this.http.get(this.url + id);
  }

  registrarCliente(cliente: Cliente): Observable<any> {
    return this.http.post(this.url, cliente);
  }

  actualizarCliente(id: string, cliente: Cliente): Observable<any> {
    return this.http.put(this.url + id, cliente);
  }

  eliminarCliente(id: string): Observable<any> {
    return this.http.delete(this.url + id);
  }
}
