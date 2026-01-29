import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { autenticarPanelAdmin } from '../../core/services/utils.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-finalizar-registro',
  imports: [ReactiveFormsModule],
  templateUrl: './finalizar-registro.html',
  styleUrl: './finalizar-registro.css',
})
export class FinalizarRegistro {
  miForm: FormGroup;
  titulo: string = 'Finalizar Registro';
  mensaje: string = '';
  tipo: boolean = false;
  token: string = '';

  constructor(private router: Router, private cd: ChangeDetectorRef) {
    this.miForm = new FormGroup({
      email: new FormControl('', [])
    }, []);
  }

  ngOnInit(): void {
    autenticarPanelAdmin(this.router);
  }

  async cargarDatos() {

    const email = localStorage.getItem('email');
    const usuarioId = await this.consultarUsuarioPorEmail(email);

    //hacer validación
    if (email) {
      //console.log(email);
      const registroPorEmail = await this.consultarRegistroPorEmail(email);
      if (registroPorEmail.error === 'No encontrado') {

        //crear un token
        var rand = function () {
          return Math.random().toString(36).substr(2);
        };

        var token = function () {
          return rand() + rand();
        };

        this.token = token();

        //guardar el registro
        await this.crearRegistro(usuarioId, this.token);
      }else{
        this.mensaje='El usuario ya tiene un Pase';
        this.router.navigate([`/boleto/${registroPorEmail[0].token}`]);
        this.cd.detectChanges();
      }
    }


  }
  async crearRegistro(usuario: number, token: string) {

    if (usuario && token) {
      await fetch(`${environment.apiUrl}api/registro/crear`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({ usuario: usuario, token: token })
      })
        .then(response => response.json())
        .then(data => {
          //console.log(data);
          if (data.error) {
            this.mensaje = data.error;
            return;
          }
          
          this.mensaje = data.mensaje;
          this.tipo = true;
          this.router.navigate([`/boleto/${this.token}`]);
          this.cd.detectChanges();
        })
        .catch(error => console.log(error))
        .finally(() => {
          this.cd.detectChanges();
        });
    } else {
      this.mensaje = 'Usuario no válido';
      console.error('Falta el email o el token');
    }
  }
  async consultarUsuarioPorEmail(email: string | null) {
    return await fetch(`${environment.apiUrl}api/auth/obtener-usuario-por-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify({ email: email })
    })
      .then(response => response.json())
      .then(data => {
        //console.log(data);
        return data.id;
      })
      .catch(error => console.log(error));
  }

  async consultarRegistroPorEmail(email: string | null) {

    return await fetch(`${environment.apiUrl}api/registro/obtener-registro-por-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify({ email: email })
    })
      .then(response => response.json())
      .then(data => {
        //console.log(data);
        return data;
      })
      .catch(error => console.log(error));
  }
}
