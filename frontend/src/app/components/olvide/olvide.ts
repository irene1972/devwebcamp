import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-olvide',
  imports: [ReactiveFormsModule,RouterLink,RouterLinkActive],
  templateUrl: './olvide.html',
  styleUrl: './olvide.css',
})
export class Olvide {
  miForm:FormGroup;
  titulo:string='Olvidé mi password';
  mensaje:string='';

   constructor(private router:Router, private cd: ChangeDetectorRef){
    
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
    this.mensaje='';
    if(!this.miForm.valid){
      this.miForm.markAllAsTouched();
      return;
    }
    console.log(this.miForm.value);
    
    fetch(`${environment.apiUrl}api/auth/olvide`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json; charset=UTF-8'
      },
      body:JSON.stringify(this.miForm.value)
    })
      .then(response=>response.json())
      .then(data=>{
        if(data.error){
          console.log(data.error);
          this.mensaje=data.error;
          return;
        }
        this.mensaje=data.mensaje;
        
      })
      .catch(error=>console.log(error))
      .finally(()=>{
        this.cd.detectChanges();
      })
  }
}
