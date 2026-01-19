import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-ponentes',
  imports: [ReactiveFormsModule,RouterLink,RouterLinkActive],
  templateUrl: './ponentes.html',
  styleUrl: './ponentes.css',
})
export class Ponentes {
  miForm:FormGroup;
  titulo:string='Ponentes / Conferencistas';

  constructor(){
    this.miForm=new FormGroup({},[]);
  }

  cargarDatos(){
    
  }
}
