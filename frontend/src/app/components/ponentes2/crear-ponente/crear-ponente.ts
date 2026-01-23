import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { insertar_tags, eliminar_tag } from '../../../../app/core/services/utils.service';
import { environment } from '../../../../environments/environment';
import { autenticarPanelAdmin } from '../../../core/services/utils.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-crear-ponente',
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './crear-ponente.html',
  styleUrl: './crear-ponente.css',
})
export class CrearPonente {
  @ViewChild('fileInput') fileInput!: ElementRef;
  miForm: FormGroup;
  titulo: string = 'Crear Ponente';
  mensaje: string = '';
  tipo: boolean = false;
  tags: string[] = [];
  imagenFile!: File | null;

  constructor(private cd: ChangeDetectorRef, private router: Router) {

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
    autenticarPanelAdmin(this.router);
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

    fetch(`${environment.apiUrl}api/ponente/crear`, {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          this.mensaje = data.error;
          return;
        }

        this.fileInput.nativeElement.value = '';

        for (let propiedad in this.miForm.value) {
          this.miForm.get(propiedad)?.reset();
        }

        this.tags = [];

        //redirect hacia /ponentes
        this.router.navigate(['/admin/ponentes']);

        this.mensaje = data.mensaje;
        this.tipo = true;


      })
      .catch(error => console.log(error))
      .finally(() => {
        this.cd.detectChanges();
      });


  }

  insertarTags(event: KeyboardEvent) {
    insertar_tags(event, this.tags, this.miForm);
  }

  eliminarTag(index: number) {
    eliminar_tag(index, this.tags, this.miForm);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.imagenFile = input.files[0];
      console.log(this.imagenFile);
    }
  }
}
