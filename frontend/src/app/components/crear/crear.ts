import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-crear',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './crear.html',
  styleUrl: './crear.css',
})
export class Crear {
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
    if (!this.miForm.valid || !this.imagenFile) {
      this.miForm.markAllAsTouched();
      return;
    }
    console.log(this.miForm.value);

    const formData = new FormData();

    // campos normales
    Object.entries(this.miForm.value).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    // archivo
    formData.append('imagen', this.imagenFile);

    this.http.post('http://localhost:3000/api/auth/ponentes', formData)
      .subscribe(resp => {
        console.log(resp);
      });

  }
  insertarTags(event: Event) {
    event.preventDefault();

    const input = event.target as HTMLInputElement;
    const valor = input.value.trim();

    if (!valor) return;

    valor.split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0)
      .forEach(tag => {
        if (!this.tags.includes(tag)) {
          this.tags.push(tag);
        }
      });

    input.value = '';

    this.miForm.get('tags')?.setValue(this.tags.join(','));

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
      this.miForm.patchValue({
        imagen: this.imagenFile.name
      });
    }
  }
}
