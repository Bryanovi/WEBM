import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Caja } from '../models/cajas.model';

@Injectable({
  providedIn: 'root',
})
export class CajaService {
  url = '/api/cajas/';
  constructor(private http: HttpClient) {}

  cargarCajas(): Observable<any> {
    return this.http.get(this.url);
  }

  registrarCaja(caja: Caja): Observable<any> {
    return this.http.post(this.url, caja);
  }
}
