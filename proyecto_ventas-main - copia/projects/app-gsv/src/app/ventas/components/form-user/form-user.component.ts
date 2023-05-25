import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'gsv-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css'],
})
export class FormUserComponent {
  @Input() dataCliente!: any;
  @Input() dataVendedor!: any;
  @Input() validarGenerarVenta!: any;

  validarEnviado = false;

  formulario!: FormGroup;
  @Output() formularioEnviado: EventEmitter<any> = new EventEmitter();
  @Output() formularioCerrado: EventEmitter<void> = new EventEmitter<void>();

  ngOnInit(): void {
    this.cargarFormulario();
    this.validarEnviado = false;
    console.log(this.validarGenerarVenta);
  }

  cargarFormulario() {
    this.formulario = new FormGroup({
      // _id: new FormGroup(this.data?._id),
      cliente: new FormControl(
        this.dataCliente?.nombresCompletos,
        Validators.required
      ),
      vendedor: new FormControl(
        this.dataVendedor?.nombresCompletos,
        Validators.required
      ),
    });
  }
  grabar() {
    if (this.formulario.valid) {
      const formData = this.formulario.value;
      console.log(formData);

      //valida el envio y se bloquea el boton
      this.validarEnviado = true;

      this.formularioEnviado.emit(formData);

      // Deshabilitar el formulario
      this.formulario.disable();
    }
  }

  cerrarFormulario() {
    this.formularioCerrado.emit();
  }

  limpiarFormulario() {
    this.formulario.reset();
    this.validarEnviado = false;
    this.formulario.enable();
  }
}
