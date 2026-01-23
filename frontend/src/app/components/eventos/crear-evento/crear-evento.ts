import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { autenticarPanelAdmin } from '../../../core/services/utils.service';

@Component({
  selector: 'app-crear-evento',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './crear-evento.html',
  styleUrl: './crear-evento.css',
})
export class CrearEvento {
  titulo: string = 'Registrar Evento';
  miForm: FormGroup;
  mensaje: string = '';
  tipo:boolean=false;
  categorias:any[]=[];
  dias:any[]=[];

  constructor(private cd: ChangeDetectorRef, private router: Router) {
    this.miForm = new FormGroup({
      nombre: new FormControl('', [
        Validators.required
      ]),
      descripcion: new FormControl('', [
        Validators.required
      ]),
      categoria_id: new FormControl('', [])

    }, []);
  }

  ngOnInit(): void {
    autenticarPanelAdmin(this.router);

    fetch(`${environment.apiUrl}api/categoria/listar`)
      .then(response=>response.json())
      .then(data=>{
        if(data.error){
          console.log(data.error);
          this.mensaje=data.error;
          return;
        }
        console.log(data);
        this.categorias=data;
        this.cd.detectChanges();
      })
      .catch(error=>console.log(error));

      fetch(`${environment.apiUrl}api/dia/listar`)
      .then(response=>response.json())
      .then(data=>{
        if(data.error){
          console.log(data.error);
          this.mensaje=data.error;
          return;
        }
        console.log(data);
        this.dias=data;
        this.cd.detectChanges();
      })
      .catch(error=>console.log(error));
  }

  get nombre() {
    return this.miForm.get('nombre');
  }

  get descripcion() {
    return this.miForm.get('descripcion');
  }

  get categoria_id() {
    return this.miForm.get('categoria_id');
  }

  cargarDatos() {
    if (!this.miForm.valid) {
      this.miForm.markAllAsTouched();
      return;
    }
    console.log(this.miForm.value);

    const formData = new FormData();

    // campos normales
    Object.entries(this.miForm.value).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    fetch(`${environment.apiUrl}api/evento/crear`, {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          this.mensaje = data.error;
          return;
        }

        console.log(data);


      })
      .catch(error => console.log(error))
      .finally(() => {
        this.cd.detectChanges();
      });


  }
}
