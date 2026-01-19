import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  miForm:FormGroup;
  titulo:string='Panel de administración';

  constructor(){
    this.miForm=new FormGroup({},[]);
  }

  cargarDatos(){
    
  }
}
