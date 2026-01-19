import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-registrados',
  imports: [ReactiveFormsModule,RouterLink,RouterLinkActive],
  templateUrl: './registrados.html',
  styleUrl: './registrados.css',
})
export class Registrados {
  miForm: FormGroup;
  titulo: string = 'Usuarios Registrados';

  constructor() {
    this.miForm = new FormGroup({}, []);
  }

  cargarDatos() {

  }
}
