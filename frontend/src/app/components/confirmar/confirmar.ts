import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-confirmar',
  imports: [],
  templateUrl: './confirmar.html',
  styleUrl: './confirmar.css',
})
export class Confirmar implements OnInit {
  titulo: string = 'Confirma tu cuenta';
  token!: string;
  mensaje:string='HA HABIDO UN ERROR';

  constructor(private route: ActivatedRoute, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    // Obtener parámetro de la ruta
    this.token = this.route.snapshot.queryParamMap.get('token')!;

    //llamada a la api que me devuelva los datos del token decodificado
    fetch('http://localhost:3000/api/auth/decodificar-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify({ token: this.token })
    })
      .then(response => response.json())
      .then(data => {
        const email = data.decoded.user;

        try {
          fetch(`http://localhost:3000/api/auth/confirmar/${email}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json; charset=UTF-8'
            }
          })
            .then(response => response.json())
            .then(data => {
              
              if(data.error){
                console.log(data.error);
                return;
              }
              this.mensaje='CUENTA COMPROBADA CORRECTAMENTE';
              this.cd.detectChanges();

            })
            .catch(error => console.log(error));
        } catch (error) {
          console.log(error);
        }

      })
      .catch(error => console.log(error));


    //hacer un PUT para actualizar el campor confirmado del email obtenido  

    //si todo bien pintamos la CONFIRMACIÓN DE CUENTA CON EXITO
    //sino pintamos un mensaje de error

  }
}
