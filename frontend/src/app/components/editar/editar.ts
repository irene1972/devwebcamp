import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { insertar_tags, eliminar_tag } from '../../../app/core/services/utils.service';
import { environment } from '../../../environments/environment';
import { autenticarPanelAdmin } from '../../core/services/utils.service';

@Component({
  selector: 'app-editar',
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './editar.html',
  styleUrl: './editar.css',
})
export class Editar {
  miForm: FormGroup;
  titulo: string = 'Actualizar Ponente';
  mensaje: string = '';
  tipo: boolean = false;
  tags: string[] = [];
  id: string | null = '';
  redes: any = {};
  imagen: string = '';
  imagenFile!: File | null;
  imagesUrl:string=environment.imagesUrl;

  constructor(private cd: ChangeDetectorRef, private route: ActivatedRoute, private router: Router) {

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
  ngOnInit(): void {
    autenticarPanelAdmin(this.router);
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.id = id;
    });
    this.obtenerDatos();
  }

  async actualizarDatos() {
    //todo:
    //recoger todos los campos, actualizar bd con todos los campos modificados 
    //ahora la imagen no es obligatorio subirla
    //Si se sube muy importante actualizar en bd la nueva ruta de imagen
    if (!this.miForm.valid) {
      this.miForm.markAllAsTouched();
      this.mensaje = 'Los campos nombre,apellido,ciudad y pais son obligatorios';
      return;
    }
    console.log(this.miForm.value);

    const formData = new FormData();

    // campos normales
    Object.entries(this.miForm.value).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    if (this.imagenFile) {
      // archivo
      formData.append('imagen', this.imagenFile);
    }

    await fetch(`${environment.apiUrl}api/ponente/editar/${this.id}`, {
      method: 'PUT',
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          this.mensaje = data.error;
          return;
        }
        this.tipo = true;
        this.mensaje = data.mensaje;
        this.router.navigate(['/admin/ponentes']);


      })
      .catch(error => console.log(error))
      .finally(() => {
        this.cd.detectChanges();
      });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.imagenFile = input.files[0];
      console.log(this.imagenFile);
    }
  }

  insertarTags(event: KeyboardEvent) {
    insertar_tags(event,this.tags,this.miForm);
  }

  eliminarTag(index: number) {
    eliminar_tag(index,this.tags,this.miForm);
  }
  async obtenerDatos() {

    await fetch(`${environment.apiUrl}api/ponente/editar/${this.id}`, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(data => {
        const ponente = data[0];

        if (data.length === 0) this.router.navigate(['/admin/ponentes']);

        this.imagen = ponente.imagen;

        this.tags = ponente.tags.split(',');

        this.redes = JSON.parse(ponente.redes);

        this.miForm.patchValue({
          nombre: ponente.nombre,
          apellido: ponente.apellido,
          ciudad: ponente.ciudad,
          pais: ponente.pais,
          redes_facebook: decodeURIComponent(this.redes.facebook === undefined ? '' : this.redes.facebook),
          redes_twitter: decodeURIComponent(this.redes.twitter === undefined ? '' : this.redes.twitter),
          redes_youtube: decodeURIComponent(this.redes.youtube === undefined ? '' : this.redes.youtube),
          redes_instagram: decodeURIComponent(this.redes.instagram === undefined ? '' : this.redes.instagram),
          redes_tiktok: decodeURIComponent(this.redes.tiktok === undefined ? '' : this.redes.tiktok),
          redes_github: decodeURIComponent(this.redes.github === undefined ? '' : this.redes.github)
        });

      })
      .catch(error => console.log(error))
      .finally(() => {
        this.cd.detectChanges();
      });
  }
}
