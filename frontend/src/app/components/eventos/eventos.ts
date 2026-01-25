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
        this.cd.detectChanges();
      })
      .catch(error => console.log(error));
  }
  

}
