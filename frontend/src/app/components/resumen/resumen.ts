import { ChangeDetectorRef, Component } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-resumen',
  imports: [],
  templateUrl: './resumen.html',
  styleUrl: './resumen.css',
})
export class Resumen {
  totalPonentes:number=0;
  totalConferencias:number=0;
  totalWorkshops:number=0;

  constructor(private cd: ChangeDetectorRef){}
  
  ngOnInit(){
    this.obtenerTotalPonentes();
    this.obtenerTotalEventos();
  }
  obtenerTotalPonentes(){
    fetch(`${environment.apiUrl}api/ponente/total`,{
      method:'GET'
    })
      .then(response=>response.json())
      .then(data=>{
        //console.log(data[0]);
        this.totalPonentes=data[0].total_ponentes;
      })
      .catch(error=>console.log(error))
      .finally(() => {
        this.cd.detectChanges();
      });
  }
  obtenerTotalEventos(){
    fetch(`${environment.apiUrl}api/evento/total`,{
      method:'GET'
    })
      .then(response=>response.json())
      .then(data=>{
        //console.log(data);
        this.totalConferencias=data[0].total;
        this.totalWorkshops=data[1].total;
      })
      .catch(error=>console.log(error))
      .finally(() => {
        this.cd.detectChanges();
      });
  }
}
