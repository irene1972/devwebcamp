import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-registro',
  imports: [ReactiveFormsModule,RouterLink,RouterLinkActive],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro {
  miForm:FormGroup;
  titulo:string='Registro';
  mensaje:string='';

  constructor(private router:Router, private cd: ChangeDetectorRef){
    
    this.miForm=new FormGroup({
      nombre:new FormControl('',[
        Validators.required,
        Validators.minLength(3)
      ]),
      apellido:new FormControl('',[
        Validators.required,
        Validators.minLength(3)
      ]),
      email:new FormControl('',[
        Validators.required,
        Validators.pattern( /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      ]),
      password:new FormControl('',[
        Validators.required,
        Validators.minLength(3)
      ]),
      password2:new FormControl('',[
        Validators.required,
        Validators.minLength(3)
      ]),

    },[]);
  }

  get nombre() {
    return this.miForm.get('nombre');
  }

  get apellido() {
    return this.miForm.get('apellido');
  }

  get email() {
  return this.miForm.get('email');
}

  get password() {
    return this.miForm.get('password');
  }

  get password2() {
    return this.miForm.get('password');
  }

  cargarDatos(){
    if(!this.miForm.valid){
      this.miForm.markAllAsTouched();
      return;
    }
    //console.log(this.miForm.value);

    fetch('http://localhost:3000/api/auth/registro',{
      method:'POST',
      headers:{
        'Content-Type':'application/json; charset=UTF-8'
      },
      body:JSON.stringify(this.miForm.value)
    })
      .then(response=>response.json())
      .then(data=>{
        console.log(data);
        if(data.error){
          console.log(data.error);
          this.mensaje=data.error;
          this.cd.detectChanges();
          return;
        }

        this.router.navigate(['/cuenta-creada']);
        
      })
      .catch(error=>console.log(error));

    
  }
}
