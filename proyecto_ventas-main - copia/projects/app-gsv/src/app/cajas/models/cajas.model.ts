export class Caja {
  _id?: string;
  cliente?: string;
  vendedor?: string;
  fechaCreacion?: Date;
  total?: number;

  constructor(
    cliente?: string,
    vendedor?: string,
    fechaCreacion?: Date,
    total?: number
  ) {
    this.cliente = cliente;
    this.vendedor = vendedor;
    this.fechaCreacion = fechaCreacion;
    this.total = total;
  }
}
