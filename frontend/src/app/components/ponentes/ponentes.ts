import { ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-ponentes',
  imports: [ReactiveFormsModule, RouterLink, RouterLinkActive],
  templateUrl: './ponentes.html',
  styleUrl: './ponentes.css',
})
export class Ponentes {
  miForm: FormGroup;
  titulo: string = 'Ponentes / Conferencistas';
  mensaje: string = '';
  tipo: boolean = false;
  arrayPonentes: any = [];

  //añadir paginación
  ponentesPaginados: any[] = [];

  paginaActual: number = 1;
  itemsPorPagina: number = 5;
  totalPaginas: number = 0;

  constructor(private cd: ChangeDetectorRef, private router: Router) {
    this.miForm = new FormGroup({}, []);
  }

  ngOnInit(): void {
    fetch(`${environment.apiUrl}api/ponente/listar`, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(data => {
        //console.log(data);
        if (data.error) {
          this.mensaje = data.error;
          return;
        }
        if (data.length === 0) {
          this.mensaje = 'No hay datos de ponentes';
          this.tipo = true;
        } else {
          this.arrayPonentes = data;

          //añadir paginación
          this.totalPaginas = Math.ceil(this.arrayPonentes.length / this.itemsPorPagina);
          this.actualizarPaginacion();
        }
      })
      .catch(error => console.log(error))
      .finally(() => {
        this.cd.detectChanges();
      });
  }

  eliminar(event: Event, id: number) {
    event.preventDefault();
    const boton = event.target as HTMLInputElement;

    fetch(`${environment.apiUrl}api/ponente/eliminar/${id}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        //reload
        window.location.reload();
      })
      .catch(error => console.log(error));
  }

  actualizarPaginacion() {
    const inicio = (this.paginaActual - 1) * this.itemsPorPagina;
    const fin = inicio + this.itemsPorPagina;
    this.ponentesPaginados = this.arrayPonentes.slice(inicio, fin);
  }

  paginaAnterior() {
    if (this.paginaActual > 1) {
      this.paginaActual--;
      this.actualizarPaginacion();
    }
  }

  paginaSiguiente() {
    if (this.paginaActual < this.totalPaginas) {
      this.paginaActual++;
      this.actualizarPaginacion();
    }
  }
}
