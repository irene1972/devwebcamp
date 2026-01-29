import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { autenticarPanelAdmin } from '../../core/services/utils.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-finalizar-registro',
  imports: [ReactiveFormsModule],
  templateUrl: './finalizar-registro.html',
  styleUrl: './finalizar-registro.css',
})
export class FinalizarRegistro {
  miForm: FormGroup;
  titulo: string = 'Finalizar Registro';

  constructor(private router: Router) {
    this.miForm = new FormGroup({
      email: new FormControl('', [])
    }, []);
  }

  ngOnInit(): void {
    autenticarPanelAdmin(this.router);
  }

  cargarDatos() {
    var rand = function () {
      return Math.random().toString(36).substr(2); // remove `0.`
    };

    var token = function () {
      return rand() + rand(); // to make it longer
    };

    const miToken=token();
    console.log('generamos token');
    console.log(miToken);
  }
}
