import { ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-eventos',
  imports: [ReactiveFormsModule, RouterLink, RouterLinkActive],
  templateUrl: './eventos.html',
  styleUrl: './eventos.css',
})
export class Eventos {
  miForm: FormGroup;
  titulo: string = 'Conferencias y Workshops';
  tipo: boolean = false;
  mensaje: string = '';
  arrayEventos: any[] = [];

  //añadir paginación
  eventosPaginados: any[] = [];

  paginaActual: number = 1;
  itemsPorPagina: number = 5;
  totalPaginas: number = 0;

  constructor(private cd: ChangeDetectorRef) {
    this.miForm = new FormGroup({}, []);
  }
  ngOnInit(): void {
    this.listarEventos();



  }
  listarEventos() {
    fetch(`${environment.apiUrl}api/evento/listarConJoin`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.arrayEventos = data;
        
        //añadir paginación
        this.totalPaginas = Math.ceil(this.arrayEventos.length / this.itemsPorPagina);
        this.actualizarPaginacion();
      })
      .catch(error => console.log(error));
  }

  actualizarPaginacion() {
    const inicio = (this.paginaActual - 1) * this.itemsPorPagina;
    const fin = inicio + this.itemsPorPagina;
    this.eventosPaginados = this.arrayEventos.slice(inicio, fin);
    this.cd.detectChanges();
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
