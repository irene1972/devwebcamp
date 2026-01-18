import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirmar',
  imports: [],
  templateUrl: './confirmar.html',
  styleUrl: './confirmar.css',
})
export class Confirmar implements OnInit {
  titulo: string = 'Confirma tu cuenta';
  token!: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Obtener parámetro de la ruta
    this.token = this.route.snapshot.queryParamMap.get('token')!;
    console.log('Token:', this.token);

    const secret = 'superIrene';

    //llamada a la api que me devuelva los datos del token decodificado
    console.log('irene4');
    fetch('http://localhost:3000/api/auth/decodificar-token',{
      method:'POST',
      headers:{
        'Content-Type':'application/json; charset=UTF-8'
      },
      body:JSON.stringify({token:this.token})
    })
      .then(response=>response.json())
      .then(data=>{
        console.log(data);
        const email=data.decoded.user;
      })
      .catch(error=>console.log(error));

    
    //hago la consulta get usuarios y extraigo el token que se corresponde al email 

    //si this.token===tokenObtenido => pintamos la CONFIRMACIÓN DE CUENTA CON EXITO
    //sino pintamos un mensaje de error

  }
}
