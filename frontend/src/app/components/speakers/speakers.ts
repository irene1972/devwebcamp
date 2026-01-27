import { ChangeDetectorRef, Component } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-speakers',
  imports: [],
  templateUrl: './speakers.html',
  styleUrl: './speakers.css',
})
export class Speakers {
  imagesUrl:string=environment.imagesUrl;
  ponentes:any[]=[];
  constructor(private cd: ChangeDetectorRef){}

  ngOnInit(){
    this.obtenerPonentes();
  }

  obtenerPonentes(){
    fetch(`${environment.apiUrl}api/ponente/listar`,{
      method:'GET'
    })
      .then(response=>response.json())
      .then(data=>{
        console.log(data);
        this.ponentes=data;
      })
      .catch(error=>console.log(error))
      .finally(() => {
        this.cd.detectChanges();
      });
  }
}
