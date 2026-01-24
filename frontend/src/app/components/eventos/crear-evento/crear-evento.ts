import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ViewChildren, QueryList, ElementRef } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { autenticarPanelAdmin } from '../../../core/services/utils.service';

@Component({
  selector: 'app-crear-evento',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './crear-evento.html',
  styleUrl: './crear-evento.css',
})
export class CrearEvento {
  titulo: string = 'Registrar Evento';
  miForm: FormGroup;
  mensaje: string = '';
  tipo: boolean = false;
  categorias: any[] = [];
  dias: any[] = [];
  horas: any[] = [];
  //diaHidden:string='';
  datos: any = { categoria_id: "", dia: "" };
  @ViewChildren('horaItem') horasLi!: QueryList<ElementRef<HTMLLIElement>>;
  idsHorasTomadas:any[]=[];

  constructor(private cd: ChangeDetectorRef, private router: Router) {
    this.miForm = new FormGroup({
      nombre: new FormControl('', [
        Validators.required
      ]),
      descripcion: new FormControl('', [
        Validators.required
      ]),
      categoria_id: new FormControl('', [
        Validators.required
      ]),
      ponente_id: new FormControl('', [
        Validators.required
      ]),
      disponible: new FormControl('', [
        Validators.required
      ]),
      dia: new FormControl('', [
        Validators.required
      ]),
      diaHidden: new FormControl('', []),
      horaHidden: new FormControl('', [])

    }, []);
  }

  ngOnInit(): void {
    autenticarPanelAdmin(this.router);

    fetch(`${environment.apiUrl}api/categoria/listar`)
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          //console.log(data.error);
          this.mensaje = data.error;
          return;
        }
        //console.log(data);
        this.categorias = data;
        this.cd.detectChanges();
      })
      .catch(error => console.log(error));

    fetch(`${environment.apiUrl}api/dia/listar`)
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          //console.log(data.error);
          this.mensaje = data.error;
          return;
        }
        //console.log(data);
        this.dias = data;
        this.cd.detectChanges();
      })
      .catch(error => console.log(error));

    fetch(`${environment.apiUrl}api/hora/listar`)
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          //console.log(data.error);
          this.mensaje = data.error;
          return;
        }
        //console.log(data);
        this.horas = data;
        this.cd.detectChanges();
      })
      .catch(error => console.log(error));
  }

  get nombre() {
    return this.miForm.get('nombre');
  }

  get descripcion() {
    return this.miForm.get('descripcion');
  }

  get categoria_id() {
    return this.miForm.get('categoria_id');
  }

  get ponente_id() {
    return this.miForm.get('ponente_id');
  }

  get disponible() {
    return this.miForm.get('disponible');
  }

  get dia() {
    return this.miForm.get('dia');
  }

  cargarDatos() {
    console.log(this.miForm.value);

    if (!this.miForm.valid) {
      this.miForm.markAllAsTouched();
      return;
    }
    //console.log(this.miForm.value);

    fetch(`${environment.apiUrl}api/evento/crear`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.miForm.value)
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          this.mensaje = data.error;
          return;
        }

        console.log(data);
        this.router.navigate(['/admin/eventos']);

      })
      .catch(error => console.log(error))
      .finally(() => {
        this.cd.detectChanges();
      });


  }

  terminoBusqueda(event: Event) {
    const input = event.target as HTMLInputElement;
    //rellenamos el input oculto de dia
    this.miForm.get('diaHidden')?.setValue(input.id);

    //hacemos que aparezcan solo las opciones de hora que correspondan al día seleccionado
    this.datos.dia = this.dia?.value[0];
    //console.log(this.datos);
    this.buscarEventos(this.datos);

    this.cd.detectChanges();
  }

  terminoBusqueda2() {
    this.datos.categoria_id = this.categoria_id?.value;
    //console.log(this.datos);
    this.buscarEventos(this.datos);
  }

  buscarEventos(datos: any) {
    if (Object.values(datos).includes('')) {
      return;
    }

    fetch(`${environment.apiUrl}api/evento/listar/${datos.categoria_id}/${datos.dia}`)
      .then(response => response.json())
      .then(data => {
        //console.log(data);
        this.obtenerHorasDisponibles(data);
      })
      .catch(error => console.log(error));


  }

  obtenerHorasDisponibles(data: any) {
    const horasTomadas = data.map((evento: any) => evento.hora_id);
    
    if (!this.horasLi) return;

    const horasNoTomadas = this.horasLi.toArray().filter(li => !horasTomadas.includes(Number(li.nativeElement.dataset['id'])));
  
    horasNoTomadas.forEach(elem=>{
      elem.nativeElement.classList.remove('deshabilitada');
    });

    this.idsHorasTomadas=horasTomadas;

    this.cd.detectChanges();
  }

  seleccionarHora(event: Event, hora: any) {
    this.miForm.get('horaHidden')?.setValue(hora.id);

    let datosLleno = true;
    Object.values(this.datos).forEach(elem => {
      if (!elem) {
        datosLleno = false
      }
    });
    console.log(datosLleno);
    if (datosLleno) {
      const li = event.target as HTMLLIElement;
      li.classList.remove('deshabilitada');

      const arrayLis = li.parentElement?.querySelectorAll('.resaltar');
      arrayLis?.forEach(elem => {
        elem.classList.remove('resaltar');
      });

      li.classList.add('resaltar');
    }



  }
}
