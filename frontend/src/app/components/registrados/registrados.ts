import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { environment } from '../../../environments/environment';
import { UsuariosRegistrados } from '../../interfaces/usuariosRegistrados';

@Component({
  selector: 'app-registrados',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './registrados.html',
  styleUrl: './registrados.css',
})
export class Registrados {
  titulo: string = 'Usuarios Registrados';
  usuariosRegistrados: UsuariosRegistrados[] = []

  //añadir paginación
  usuariosRegistrados_paginados: UsuariosRegistrados[] = []

  paginaActual: number = 1;
  itemsPorPagina: number = 5;
  totalPaginas: number = 0;

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.obtenerUsuariosRegistrados();
  }
  async obtenerUsuariosRegistrados() {
    await fetch(`${environment.apiUrl}api/registro/listar-usuarios-registrados`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.usuariosRegistrados = data;

        //añadir paginación
        this.totalPaginas = Math.ceil(this.usuariosRegistrados.length / this.itemsPorPagina);
        this.actualizarPaginacion();
      })
      .catch(error => console.log(error))
      .finally(() => {
        this.cd.detectChanges();
      })
  }

  
  actualizarPaginacion() {
    const inicio = (this.paginaActual - 1) * this.itemsPorPagina;
    const fin = inicio + this.itemsPorPagina;
    this.usuariosRegistrados_paginados = this.usuariosRegistrados.slice(inicio, fin);
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
