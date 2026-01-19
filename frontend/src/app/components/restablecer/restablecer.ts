import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-restablecer',
  imports: [ReactiveFormsModule, RouterLink, RouterLinkActive],
  templateUrl: './restablecer.html',
  styleUrl: './restablecer.css',
})
export class Restablecer {
  miForm: FormGroup;
  token!: string;
  titulo: string = 'Restablecer Password';
  mensaje:string='';

  constructor(private route: ActivatedRoute) {
    this.miForm = new FormGroup({
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ])

    }, []);
  }
  ngOnInit():void{
    this.token = this.route.snapshot.queryParamMap.get('token')!;
    console.log(this.token);
  }
  get password() {
    return this.miForm.get('password');
  }

  cargarDatos() {
    if(!this.miForm.valid){
      this.miForm.markAllAsTouched();
      return;
    }
    console.log(this.miForm.value);

    //llamar a restablecer password

    //mostrar alertas de error y exito
  }
}
