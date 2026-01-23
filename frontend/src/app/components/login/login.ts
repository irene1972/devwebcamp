import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterLink,RouterLinkActive],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  miForm:FormGroup;
  titulo:string='Iniciar Sesión';
  mensaje:string='';
  tipo:boolean=false;

   constructor(private cd: ChangeDetectorRef,private router:Router){
    
    this.miForm=new FormGroup({
      email:new FormControl('',[
        Validators.required,
        Validators.pattern( /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      ]),
      password:new FormControl('',[
        Validators.required,
        Validators.minLength(3)
      ])

    },[]);
  }

  get email() {
  return this.miForm.get('email');
}

  get password() {
    return this.miForm.get('password');
  }

  cargarDatos(){
    if(!this.miForm.valid){
      this.miForm.markAllAsTouched();
      return;
    }
    console.log(this.miForm.value);

    fetch('http://localhost:3000/api/auth/login',{
      method:'POST',
      headers:{
        'Content-Type':'application/json; charset=UTF-8'
      },
      body:JSON.stringify(this.miForm.value)
    })
      .then(response=>response.json())
      .then(data=>{
        
        if(data.error){
          this.mensaje=data.error;
          return;
        }

        this.tipo=true;
        const token=data.mensaje;
        localStorage.setItem('token', token);
        if(data.admin){
          this.router.navigate(['/admin/dashboard']);
        }else{
          this.router.navigate(['/home']);
        }
        
      })
      .catch(error=>console.log(error))
      .finally(()=>{
        this.cd.detectChanges();
      });
  }
}
