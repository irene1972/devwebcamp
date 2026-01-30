import { ChangeDetectorRef, Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Cards } from '../conferencias/cards/cards';

@Component({
  selector: 'app-conferencias-pago',
  imports: [Cards],
  templateUrl: './conferencias-pago.html',
  styleUrl: './conferencias-pago.css',
})
export class ConferenciasPago {
  titulo: string = 'Conferencias & Workshops';
  imagesUrl: string = environment.imagesUrl;
  categorias: any = [];
  dias: any = [];
  eventos1: any = [];
  eventos2: any = [];
  eventos3: any = [];
  eventos4: any = [];

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.llamadaCategorias();
    this.llamadaDias();
  }
  async llamadaCategorias() {
    await fetch(`${environment.apiUrl}api/categoria/listar`, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(data => {
        //console.log(data);
        this.categorias = data;

      })
      .catch(error => console.log(error))
      .finally(() => {
        this.cd.detectChanges();
      });
  }
  async llamadaDias() {
    await fetch(`${environment.apiUrl}api/dia/listar`, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(data => {
        //console.log(data);
        this.dias = data;

      })
      .catch(error => console.log(error))
      .finally(() => {
        this.cd.detectChanges();
      });
  }
}
