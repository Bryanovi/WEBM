export class Producto {
  _id?: string;
  producto?: string;
  descripcion?: string;
  precio?: string;
  image?: string;
  

  constructor(
    producto?: string,
    descripcion?: string,
    precio?: string,
    image?: string
  ) {
    this.producto = producto;
    this.descripcion = descripcion;
    this.precio = precio;
    this.image = image;
  }
}
