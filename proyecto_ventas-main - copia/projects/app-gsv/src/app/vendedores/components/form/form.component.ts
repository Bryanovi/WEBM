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
    this.formulario = new FormGroup({
      id: new FormControl(this.data?._id),
      nombresCompletos: new FormControl(
        this.data?.nombresCompletos,
        Validators.required
      ),
      direccion: new FormControl(this.data?.direccion, Validators.required),
      fechaIngreso: new FormControl(
        this.data?.fechaIngreso,
        Validators.required
      ),
      celular: new FormControl(this.data?.celular),
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
