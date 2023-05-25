export class Cliente {
  _id?: string;
  nombresCompletos?: string;
  direccion?: string;
  correoElectronico?: string;
  celular?: string;

  constructor(
    nombresCompletos?: string,
    direccion?: string,
    correoElectronico?: string,
    celular?: string
  ) {
    this.nombresCompletos = nombresCompletos;
    this.direccion = direccion;
    this.correoElectronico = correoElectronico;
    this.celular = celular;
  }
}
