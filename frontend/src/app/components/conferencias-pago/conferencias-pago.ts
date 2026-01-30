import { ChangeDetectorRef, Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Cards } from '../conferencias/cards/cards';
import Swal from 'sweetalert2';
import { Regalo } from '../../interfaces/regalo';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-conferencias-pago',
  imports: [ReactiveFormsModule, Cards],
  templateUrl: './conferencias-pago.html',
  styleUrl: './conferencias-pago.css',
})
export class ConferenciasPago {
  titulo: string = 'Conferencias & Workshops';
  mensaje: string = '';
  tipo: boolean = false;
  miForm: FormGroup;
  imagesUrl: string = environment.imagesUrl;
  categorias: any = [];
  dias: any = [];
  regalos: Regalo[] = [];
  eventos1: any = [];
  eventos2: any = [];
  eventos3: any = [];
  eventos4: any = [];
  idEvento: any = [];
  eventosSeleccionados: any[] = [];

  constructor(private cd: ChangeDetectorRef) {

    this.miForm = new FormGroup({
      idRegalo: new FormControl('', [
        Validators.required
      ])

    }, []);
  }

  ngOnInit() {
    this.llamadaCategorias();
    this.llamadaDias();
    this.llamadaRegalos();
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
  async llamadaRegalos() {
    await fetch(`${environment.apiUrl}api/regalo/listar`, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(data => {
        //console.log(data);
        this.regalos = data;

      })
      .catch(error => console.log(error))
      .finally(() => {
        this.cd.detectChanges();
      });
  }
  recogerId(arrayEventos: any) {
    this.idEvento = arrayEventos[0];
    if (this.eventosSeleccionados.length < 5) {
      this.eventosSeleccionados.push(arrayEventos[0]);
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Sólo se permite un máximo de 5 eventos',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
    console.log(this.eventosSeleccionados);
  }

  eliminarEvento(id: number) {
    this.eventosSeleccionados = this.eventosSeleccionados.filter(evento => evento.id !== id);
  }
  cargarDatos(e:Event) {
    e.preventDefault();
    console.log(this.miForm.value);
    if(!this.miForm.value.idRegalo || this.eventosSeleccionados.length===0){
      Swal.fire({
        title: 'Error',
        text: 'Elige al menos un evento y un regalo',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }
    console.log('registrando...');

  }
}
