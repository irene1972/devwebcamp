import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-olvide',
  imports: [ReactiveFormsModule,RouterLink,RouterLinkActive],
  templateUrl: './olvide.html',
  styleUrl: './olvide.css',
})
export class Olvide {
  miForm:FormGroup;
  titulo:string='Olvidé mi password';

   constructor(){
    
    this.miForm=new FormGroup({
      email:new FormControl('',[
        Validators.required,
        Validators.pattern( /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      ])

    },[]);
  }

  get email() {
  return this.miForm.get('email');
}

  cargarDatos(){
    if(!this.miForm.valid){
      this.miForm.markAllAsTouched();
      return;
    }
    console.log(this.miForm.value);
  }
}
