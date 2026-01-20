import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crear',
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './crear.html',
  styleUrl: './crear.css',
})
export class Crear {
  @ViewChild('fileInput') fileInput!: ElementRef;
  miForm: FormGroup;
  titulo: string = 'Crear Ponente';
  mensaje: string = '';
  tipo: boolean = false;
  tags: string[] = [];
  imagenFile!: File | null;

  constructor(private http: HttpClient) {

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
  get nombre() {
    return this.miForm.get('nombre');
  }

  get apellido() {
    return this.miForm.get('apellido');
  }

  get ciudad() {
    return this.miForm.get('ciudad');
  }

  get pais() {
    return this.miForm.get('pais');
  }

  cargarDatos() {
    if (!this.miForm.valid) {
      this.miForm.markAllAsTouched();
      return;
    }
    console.log(this.miForm.value);

    if (this.imagenFile) {
      const formData = new FormData();

      // campos normales
      Object.entries(this.miForm.value).forEach(([key, value]) => {
        formData.append(key, value as string);
      });

      // archivo
      formData.append('imagen', this.imagenFile);

      this.http.post('http://localhost:3000/api/ponente/crear', formData)
        .subscribe(resp => {
          console.log(resp);
        });
    }

    this.mensaje = 'Datos guardados correctamente';
    this.tipo = true;
    this.miForm.get('nombre')?.reset();
    this.miForm.get('apellido')?.reset();
    this.miForm.get('ciudad')?.reset();
    this.miForm.get('pais')?.reset();
    this.miForm.get('imagen')?.reset();
    this.miForm.get('redes_facebook')?.reset();
    this.miForm.get('redes_twitter')?.reset();
    this.miForm.get('redes_youtube')?.reset();
    this.miForm.get('redes_instagram')?.reset();
    this.miForm.get('redes_github')?.reset();
    this.miForm.get('redes_tiktok')?.reset();

    this.fileInput.nativeElement.value = '';
    // También puedes resetear el FormControl si quieres
    this.miForm.get('imagen')?.reset();
  }

  insertarTags(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;

    // Detectar Enter o Coma
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault(); // Evita submit del form o coma en el input

      const valor = input.value.trim();
      if (!valor) return;

      // Separar por comas por si hay más de un tag
      valor.split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0)
        .forEach(tag => {
          if (!this.tags.includes(tag)) {
            this.tags.push(tag);
          }
        });

      // Limpiar input y actualizar el FormControl
      input.value = '';
      this.miForm.get('tags')?.setValue(this.tags.join(','));
    }
  }


  eliminarTag(index: number) {
    this.tags.splice(index, 1);
    this.miForm.get('tags')?.setValue(this.tags.join(','));
  }
  
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.imagenFile = input.files[0];
      console.log(this.imagenFile);
    }
  }
}
