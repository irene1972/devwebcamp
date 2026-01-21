import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-editar',
  imports: [ReactiveFormsModule, RouterLink,CommonModule],
  templateUrl: './editar.html',
  styleUrl: './editar.css',
})
export class Editar {
  miForm: FormGroup;
  titulo: string = 'Actualizar Ponente';
  mensaje: string = '';
  tipo: boolean = false;
  tags: string[] = [];
  id:number=21;
  redes:any={};
  imagen:string='';

   constructor(private cd: ChangeDetectorRef){
    
    this.miForm = new FormGroup({
      nombre: new FormControl('', [
        Validators.required
      ]),
      apellido: new FormControl('', [
        Validators.required
      ]),
      ciudad: new FormControl('', [
        Validators.required
      ]),
      pais: new FormControl('', [
        Validators.required
      ]),
      imagen: new FormControl('', []),
      tags: new FormControl('', []),
      redes_facebook: new FormControl('', []),
      redes_twitter: new FormControl('', []),
      redes_youtube: new FormControl('', []),
      redes_instagram: new FormControl('', []),
      redes_tiktok: new FormControl('', []),
      redes_github: new FormControl('', []),

    }, []);
  }

  ngOnInit(): void {
    this.obtenerDatos();
  }

  actualizarDatos() {

  }

  onFileSelected(event:Event){

  }

  insertarTags(event:Event){

  }

  eliminarTag(index:number){

  }
  async obtenerDatos(){
    const ponente=await fetch(`http://localhost:3000/api/ponente/editar/${this.id}`,{
      method:'GET'
    })
    .then(response=>response.json())
    .then(data=>{
      const ponente=data[0];

      if(data.length===0) return;

      this.imagen=ponente.imagen;

      this.tags=ponente.tags.split(',');

      this.redes=JSON.parse(ponente.redes);

      this.miForm.patchValue({
      nombre: ponente.nombre,
      apellido: ponente.apellido,
      ciudad: ponente.ciudad,
      pais: ponente.pais,
      redes_facebook: decodeURIComponent(this.redes.facebook),
      redes_twitter: decodeURIComponent(this.redes.twitter),
      redes_youtube: decodeURIComponent(this.redes.youtube),
      redes_instagram: decodeURIComponent(this.redes.instagram),
      redes_tiktok: decodeURIComponent(this.redes.tiktok),
      redes_github: decodeURIComponent(this.redes.github)
 
    });
    
    })
    .catch(error=>console.log(error))
    .finally(() => {
        this.cd.detectChanges();
      });
  }
}
