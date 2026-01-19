import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-eventos',
  imports: [ReactiveFormsModule,RouterLink,RouterLinkActive],
  templateUrl: './eventos.html',
  styleUrl: './eventos.css',
})
export class Eventos {
  miForm:FormGroup;
  titulo:string='Conferencias y Workshops';

  constructor(){
    this.miForm=new FormGroup({},[]);
  }

  cargarDatos(){

  }
}
