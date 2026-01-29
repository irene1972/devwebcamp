import { ChangeDetectorRef, Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-speakers',
  imports: [RouterLink],
  templateUrl: './speakers.html',
  styleUrl: './speakers.css',
})
export class Speakers {
  imagesUrl: string = environment.imagesUrl;
  ponentes: any[] = [];
  arrayRedes:any = [];

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.obtenerPonentes();


  }

  obtenerPonentes() {
    fetch(`${environment.apiUrl}api/ponente/listar`, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.ponentes = data;

        for (let ponente of this.ponentes) {
          const infoRedes:any={};
          infoRedes.id=ponente.id;
          const redesObj=JSON.parse(ponente.redes);
          infoRedes.redes=Object.entries(redesObj);
          this.arrayRedes.push(infoRedes);
        }
      })
      .catch(error => console.log(error))
      .finally(() => {
        this.cd.detectChanges();
      });
  }
}
