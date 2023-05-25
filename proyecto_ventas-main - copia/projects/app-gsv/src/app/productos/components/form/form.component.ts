import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'gsv-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  titulo = '';

  formulario!: FormGroup;

  @Input() data!: any;
  @Output() formularioEnviado: EventEmitter<any> = new EventEmitter();
  @Output() formularioCerrado: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}
  ngOnInit(): void {
    this.cargarFormulario();
  }

  cargarFormulario() {
    console.log('entro formulario');
    this.formulario = new FormGroup({
      id: new FormControl(this.data?._id),
      producto: new FormControl(this.data?.producto, Validators.required),
      descripcion: new FormControl(this.data?.descripcion, Validators.required),
      precio: new FormControl(this.data?.precio, Validators.required),
      image: new FormControl(this.data?.stock, Validators.required),
    });
  }

  grabar() {
    if (this.formulario.valid) {
      const formData = this.formulario.value;
      console.log(formData);
      this.formularioEnviado.emit(formData);
    }
  }

  cerrarFormulario() {
    this.formularioCerrado.emit();
  }
}
