import { ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-ponentes',
  imports: [ReactiveFormsModule,RouterLink,RouterLinkActive],
  templateUrl: './ponentes.html',
  styleUrl: './ponentes.css',
})
export class Ponentes {
  miForm:FormGroup;
  titulo:string='Ponentes / Conferencistas';
  mensaje:string='';
  tipo:boolean=false;
  arrayPonentes:any=[];

  constructor(private cd: ChangeDetectorRef,private router:Router){
    this.miForm=new FormGroup({},[]);
  }

  ngOnInit(): void {
    fetch(`http://localhost:3000/api/ponente/listar`,{
      method:'GET'
    })
      .then(response=>response.json())
      .then(data=>{
        console.log(data);
        if(data.error){
          this.mensaje=data.error;
          return;
        }
        if(data.length===0){
          this.mensaje='No hay datos de ponentes';
          this.tipo=true;
        }else{
          this.arrayPonentes=data;
        }
      })
      .catch(error=>console.log(error))
      .finally(() => {
        this.cd.detectChanges();
      });
  }

  cerrarSesion(){
    console.log('cerrar sesion');
  }
  
  eliminar(event:Event,id:number){
    event.preventDefault();
    const boton=event.target as HTMLInputElement;
    
    fetch(`http://localhost:3000/api/ponente/eliminar/${id}`,{
      method:'DELETE'
    })
      .then(response=>response.json())
      .then(data=>{
        console.log(data);
        //reload
        window.location.reload();
      })
      .catch(error=>console.log(error));
  }
}
