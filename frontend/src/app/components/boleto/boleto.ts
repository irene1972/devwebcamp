import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-boleto',
  imports: [],
  templateUrl: './boleto.html',
  styleUrl: './boleto.css',
})
export class Boleto {
  titulo: string = 'Asistencia a DevWebCamp';
  mensaje: string = '';
  tipo: boolean = false;
  token: string = '';
  usuario:any={};

  constructor(private cd: ChangeDetectorRef, private route: ActivatedRoute) { }

  async ngOnInit() {
    this.token = this.route.snapshot.paramMap.get('token')!;

    if (!this.token || this.token.length !== 22) {
      this.mensaje = 'Token no válido';
      this.cd.detectChanges();
      return;
    }
    this.usuario = await this.consultarUsuario(this.token);
    this.cd.detectChanges();
    
    
  }

  async consultarUsuario(token: string) {

    return await fetch(`${environment.apiUrl}api/auth/obtener-usuario-por-token-boleto`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify({ token: token })
    })
      .then(response => response.json())
      .then(data => {
        if(data.error){
          this.mensaje=data.error;
          return;
        }
        return data;
      })
      .catch(error => console.log(error))
      .finally(()=>{
        this.cd.detectChanges();
      });
  }

}
