import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
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

  constructor(private cd: ChangeDetectorRef) {

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

    if (!this.imagenFile) {
      this.mensaje = 'Los campos nombre,apellido,ciudad,pais,imagen son obligatorios';
      return;
    }

    const formData = new FormData();

    // campos normales
    Object.entries(this.miForm.value).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    // archivo
    formData.append('imagen', this.imagenFile);

    fetch('http://localhost:3000/api/ponente/crear', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          this.mensaje=data.error;
          return;
        }

        this.mensaje = data.mensaje;
        this.tipo = true;

        this.fileInput.nativeElement.value = '';

        for (let propiedad in this.miForm.value) {
          this.miForm.get(propiedad)?.reset();
        }

        this.tags = [];



      })
      .catch(error => console.log(error))
      .finally(() => {
        this.cd.detectChanges();
      });


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
