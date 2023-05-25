export class Vendedor {
  _id?: string;
  nombresCompletos?: string;
  direccion?: string;
  fechaIngreso?: Date;
  celular?: string;

  constructor(
    nombresCompletos?: string,
    direccion?: string,
    fechaIngreso?: Date,
    celular?: string
  ) {
    this.nombresCompletos = nombresCompletos;
    this.direccion = direccion;
    this.fechaIngreso = fechaIngreso;
    this.celular = celular;
  }
}
