import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Main } from './components/main/main';
import { C404 } from './components/c404/c404';
import { Registro } from './components/registro/registro';
import { Olvide } from './components/olvide/olvide';
import { CuentaCreada } from './components/cuenta-creada/cuenta-creada';
import { Confirmar } from './components/confirmar/confirmar';
import { Restablecer } from './components/restablecer/restablecer';
import { Dashboard } from './components/dashboard/dashboard';
import { FinalizarRegistro } from './components/finalizar-registro/finalizar-registro';
import { Eventos } from './components/eventos/eventos';
import { Registrados } from './components/registrados/registrados';
import { Regalos } from './components/regalos/regalos';
import { Ponentes2 } from './components/ponentes2/ponentes2';
import { CrearPonente } from './components/ponentes2/crear-ponente/crear-ponente';
import { EditarPonente } from './components/ponentes2/editar-ponente/editar-ponente';
import { CrearEvento } from './components/eventos/crear-evento/crear-evento';
import { EditarEvento } from './components/eventos/editar-evento/editar-evento';
import { Inicio } from './components/inicio/inicio';
import { Devwebcamp } from './components/devwebcamp/devwebcamp';
import { Paquetes } from './components/paquetes/paquetes';
import { Conferencias } from './components/conferencias/conferencias';
import { Boleto } from './components/boleto/boleto';

export const routes: Routes = [
    {path:'',pathMatch:'full',redirectTo:'home'},
    {path:'home',component:Main},
    {path:'login',component:Login},
    {path:'registro',component:Registro},
    {path:'olvide',component:Olvide},
    {path:'cuenta-creada',component:CuentaCreada},
    {path:'confirmar-cuenta',component:Confirmar},
    {path:'restablecer',component:Restablecer},
    {path:'finalizar-registro',component:FinalizarRegistro},
    {path:'admin/dashboard',component:Dashboard},
    {path:'admin/ponentes',component:Ponentes2},
    {path:'admin/ponentes/crear',component:CrearPonente},
    {path:'admin/ponentes/editar/:id',component:EditarPonente},
    {path:'admin/eventos',component:Eventos},
    {path:'admin/eventos/crear',component:CrearEvento},
    {path:'admin/eventos/editar/:id',component:EditarEvento},
    {path:'admin/registrados',component:Registrados},
    {path:'admin/regalos',component:Regalos},

    //Área pública
    {path:'inicio',component:Inicio},
    {path:'devwebcamp',component:Devwebcamp},
    {path:'paquetes',component:Paquetes},
    {path:'workshops-conferencias',component:Conferencias},
    {path:'boleto/:token',component:Boleto},

    {path:'**',component:C404}
];
