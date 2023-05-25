import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormControlName,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'gsv-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  @Input() data!: any;
  formulario!: FormGroup;
  @Output() formularioEnviado: EventEmitter<any> = new EventEmitter();
  @Output() formularioCerrado: EventEmitter<void> = new EventEmitter<void>();
  maximo: number = 0;
  registroSeleccionado!: any;

  ngOnInit(): void {
    console.log(this.data);
    this.cargarFormulario();
  }

  cargarFormulario() {
    this.formulario = new FormGroup({
      // _id: new FormGroup(this.data?._id),
      producto: new FormControl(this.data?.producto, Validators.required),
      cantidad: new FormControl(this.data?.stock, Validators.required),
    });
  }

  actualizarMaximo() {
    const productoSeleccionado = this.formulario.get('producto')?.value;
    if (!productoSeleccionado) {
      this.maximo = 0;
      return;
    }
    this.registroSeleccionado = this.data.find(
      (registro: Registro) => registro.producto == productoSeleccionado
    );

    if (!this.registroSeleccionado) {
      return;
    } else {
      console.log(this.registroSeleccionado.stock);
      this.maximo = this.registroSeleccionado.stock;
    }
  }

  grabar() {
    if (this.formulario.valid) {
      const formData = {
        ...this.formulario.value,
        _id: this.registroSeleccionado._id,
        stock: this.registroSeleccionado.stock,
        precio: this.registroSeleccionado.precio,
        descripcion: this.registroSeleccionado.descripcion,
      };
      console.log(formData);
      this.formularioEnviado.emit(formData);
      this.formulario.reset();
    }
  }
  cerrarFormulario() {
    this.formularioCerrado.emit();
  }
}
interface Registro {
  _id: number;
  producto: string;
  descripcion: string;
  stock: number;
  precio: number;
}
