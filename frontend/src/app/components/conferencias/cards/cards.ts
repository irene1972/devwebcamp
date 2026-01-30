import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-cards',
  imports: [],
  templateUrl: './cards.html',
  styleUrl: './cards.css',
})
export class Cards {
@Input() rutaImg:string='';
@Input() categoria:number=0;
@Input() dia:number=0;
@Output() idEmitir=new EventEmitter();
eventos:any=[];

constructor(private cd: ChangeDetectorRef){}

ngOnInit(){
  this.llamadaEventos(this.categoria,this.dia);
}
async llamadaEventos(categoria:number,dia:number){
    fetch(`${environment.apiUrl}api/evento/listar/${categoria}/${dia}`)
      .then(response => response.json())
      .then(data => {
        //console.log(data);
        this.eventos=data;
        
      })
      .catch(error => console.log(error))
      .finally(() => {
        this.cd.detectChanges();
      });
  }
  emitirEvento(id:number){
    this.idEmitir.emit(id);
  }
}
