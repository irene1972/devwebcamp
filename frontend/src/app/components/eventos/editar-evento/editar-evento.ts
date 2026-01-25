import { ChangeDetectorRef, Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { autenticarPanelAdmin } from '../../../core/services/utils.service';

@Component({
  selector: 'app-editar-evento',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './editar-evento.html',
  styleUrl: './editar-evento.css',
})
export class EditarEvento {
  titulo: string = 'Editar Evento';
  miForm: FormGroup;
  mensaje: string = '';
  tipo: boolean = false;
  evento: any = {};
  categorias: any[] = [];
  dias: any[] = [];
  horas: any[] = [];
  datos: any = { categoria_id: "", dia: "" };
  @ViewChildren('horaItem') horasLi!: QueryList<ElementRef<HTMLLIElement>>;
  idsHorasTomadas: any[] = [];
  ponentes: any[] = [];
  ponentesFiltrados: any[] = [];
  ponenteInvisible: boolean = false;

  constructor(private cd: ChangeDetectorRef, private route: ActivatedRoute, private router: Router) {
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
      ponente: new FormControl('', [
        Validators.required
      ]),
      disponible: new FormControl('', [
        Validators.required
      ]),
      dia: new FormControl('', [
        Validators.required
      ]),
      diaHidden: new FormControl('', []),
      horaHidden: new FormControl('', []),
      ponenteHidden: new FormControl('', [])

    }, []);
  }
  ngOnInit(): void {
    autenticarPanelAdmin(this.router);



    this.ObtenerCategorias();
    this.ObtenerDias();
    this.obtenerHoras();
    this.obtenerPonentes();
    this.ObtenerEvento();

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

  get ponente() {
    return this.miForm.get('ponente');
  }

  get disponible() {
    return this.miForm.get('disponible');
  }

  get dia() {
    return this.miForm.get('dia');
  }

  cargarDatos() {
    //console.log(this.miForm.value);
    const id = this.route.snapshot.paramMap.get('id')!;

    if (!this.miForm.valid) {
      this.miForm.markAllAsTouched();
      return;
    }
    //console.log(this.miForm.value);

    fetch(`${environment.apiUrl}api/evento/editar/${id}`, {
      method: 'PUT',
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
  ObtenerEvento() {
    //todo: obtener id de la url
    const id = this.route.snapshot.paramMap.get('id')!;

    fetch(`${environment.apiUrl}api/evento/listarConJoinById/${id}`, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          this.mensaje = data.error;
          return;
        }
        if (data.length === 0) {
          this.mensaje = 'No hay datos';
          this.tipo = true;
        } else {
          //console.log(data);
          this.evento = data[0];
          this.miForm.get('nombre')?.setValue(this.evento.nombre);
          this.miForm.get('descripcion')?.setValue(this.evento.descripcion);
          this.miForm.get('categoria_id')?.setValue(this.evento.categoria_id);
          this.miForm.get('dia')?.setValue(this.evento.dia_id);
          this.miForm.get('diaHidden')?.setValue(this.evento.dia_id);

          this.datos.dia = this.evento.dia_id;
          this.datos.categoria_id = this.evento.categoria_id;
          this.buscarEventos(this.datos);
          this.miForm.get('horaHidden')?.setValue(this.evento.hora_id);

          this.miForm.get('ponente')?.setValue(this.evento.ponente_nombre);
          this.miForm.get('ponenteHidden')?.setValue(this.evento.ponente_id);

          this.miForm.get('disponible')?.setValue(this.evento.disponibles);


        }
      })
      .catch(error => console.log(error))
      .finally(() => {
        this.cd.detectChanges();
      });
  }
  ObtenerCategorias() {
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
      })
      .catch(error => console.log(error))
      .finally(() => {
        this.cd.detectChanges();
      });
  }
  ObtenerDias() {
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
      })
      .catch(error => console.log(error))
      .finally(() => {
        this.cd.detectChanges();
      });
  }
  obtenerHoras() {
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
      })
      .catch(error => console.log(error))
      .finally(() => {
        this.cd.detectChanges();
      });
  }
  obtenerPonentes() {
    fetch(`${environment.apiUrl}api/ponente/listar`, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(data => {
        //console.log(data);
        if (data.error) {
          this.mensaje = data.error;
          return;
        }
        if (data.length === 0) {
          this.mensaje = 'No hay datos de ponentes';
          this.tipo = true;
        } else {
          //console.log(data);
          this.formatearPonentes(data);

        }
      })
      .catch(error => console.log(error))
      .finally(() => {
        this.cd.detectChanges();
      });
  }
  terminoBusqueda(evento: Event) {
    const input = evento.target as HTMLInputElement;

    this.miForm.get('diaHidden')?.setValue('');
    this.miForm.get('horaHidden')?.setValue('');
    this.cd.detectChanges();

    //rellenamos el input oculto de dia
    this.miForm.get('diaHidden')?.setValue(input.id);

    //hacemos que aparezcan solo las opciones de hora que correspondan al día seleccionado
    this.datos.dia = this.dia?.value;

    this.buscarEventos(this.datos);

    this.cd.detectChanges();
  }
  terminoBusqueda2() {
    this.datos.categoria_id = this.categoria_id?.value;

    this.buscarEventos(this.datos);
  }
  seleccionarHora(event: Event, hora: any) {
    this.miForm.get('horaHidden')?.setValue(hora.id);

    let datosLleno = true;
    Object.values(this.datos).forEach(elem => {
      if (!elem) {
        datosLleno = false
      }
    });
    //console.log(datosLleno);
    if (datosLleno) {
      const li = event.target as HTMLLIElement;
      li.classList.remove('deshabilitada');

      const arrayLis = li.parentElement?.querySelectorAll('.resaltar');
      arrayLis?.forEach(elem => {
        elem.classList.remove('resaltar');
      });

      li.classList.add('resaltar');
    }

    //this.diaHidden=this.miForm.get('dia')?.value;
  }
  buscarPonente(event: KeyboardEvent) {

    const input = event.target as HTMLInputElement;
    const stringBusqueda = input.value;
    if (stringBusqueda.length < 3) {
      this.ponentesFiltrados = [];
      this.cd.detectChanges();
      return;
    }
    const expresion = new RegExp(stringBusqueda, 'i');

    this.ponentesFiltrados = this.ponentes.filter(ponente => {
      //console.log(ponente.nombre.toLowerCase())
      if (ponente.nombre.toLowerCase().search(expresion) != -1) {
        return ponente;
      }
    });

    this.cd.detectChanges();
  }
  seleccionarPonente(evento: Event) {
    const li = evento.target as HTMLLIElement;
    this.miForm.get('ponente')?.setValue(li.textContent);
    this.miForm.get('ponenteHidden')?.setValue(li.id);
    this.ponenteInvisible = true;
    this.cd.detectChanges();
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

    horasNoTomadas.forEach(elem => {
      elem.nativeElement.classList.remove('deshabilitada');
    });

    this.idsHorasTomadas = horasTomadas;

    this.cd.detectChanges();
  }
  formatearPonentes(arrayPonentes: any[] = []) {
    this.ponentes = arrayPonentes.map(ponente => {
      return {
        nombre: ponente.nombre.trim() + ' ' + ponente.apellido.trim(),
        id: ponente.id
      }
    });

  }

}
