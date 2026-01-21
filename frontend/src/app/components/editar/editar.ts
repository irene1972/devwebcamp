import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-editar',
  imports: [ReactiveFormsModule, RouterLink,CommonModule],
  templateUrl: './editar.html',
  styleUrl: './editar.css',
})
export class Editar {
  miForm: FormGroup;
  titulo: string = 'Actualizar Ponente';
  mensaje: string = '';
  tipo: boolean = false;
  tags: string[] = [];

  constructor() {
    this.miForm = new FormGroup({
      nombre: new FormControl('', [
        Validators.required
      ]),
      apellido: new FormControl('', [
        Validators.required
      ]),
      ciudad: new FormControl('', [
        Validators.required
      ]),
      pais: new FormControl('', [
        Validators.required
      ]),
      imagen: new FormControl('', []),
      tags: new FormControl('', []),
      redes_facebook: new FormControl('', []),
      redes_twitter: new FormControl('', []),
      redes_youtube: new FormControl('', []),
      redes_instagram: new FormControl('', []),
      redes_tiktok: new FormControl('', []),
      redes_github: new FormControl('', []),

    }, []);
  }

  ngOnInit(): void {
    
  }

  actualizarDatos() {

  }

  onFileSelected(event:Event){

  }

  insertarTags(event:Event){

  }

  eliminarTag(index:number){

  }
}
