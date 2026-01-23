import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { environment } from '../../../environments/environment';

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
  mensaje: string = '';
  tipo:boolean=false;

  constructor(private route: ActivatedRoute, private cd: ChangeDetectorRef,private router:Router) {
    this.miForm = new FormGroup({
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ])

    }, []);
  }
  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token')!;
    console.log(this.token);
  }
  get password() {
    return this.miForm.get('password');
  }

  cargarDatos() {
    if (!this.miForm.valid) {
      this.miForm.markAllAsTouched();
      return;
    }
    console.log(this.miForm.value);

    //llamar a restablecer password
    fetch(`${environment.apiUrl}api/auth/restablecer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify({
        token: this.token,
        password: this.miForm.value.password
      })
    })
      .then(response=>response.json())
      .then(data=>{
        console.log(data);
        if(data.error){
          this.mensaje=data.error;
        }else{
          this.tipo=true;
          this.mensaje=data.mensaje;
          this.router.navigate(['/login']);
        }
      })
      .catch(error => console.log(error))
      .finally(()=>{
        this.cd.detectChanges();
      })
  }
}
