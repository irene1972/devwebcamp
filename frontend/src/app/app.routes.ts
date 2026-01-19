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

export const routes: Routes = [
    {path:'',pathMatch:'full',redirectTo:'home'},
    {path:'home',component:Main},
    {path:'login',component:Login},
    {path:'registro',component:Registro},
    {path:'olvide',component:Olvide},
    {path:'cuenta-creada',component:CuentaCreada},
    {path:'confirmar-cuenta',component:Confirmar},
    {path:'restablecer',component:Restablecer},
    {path:'admin/dashboard',component:Dashboard},
    {path:'finalizar-registro',component:FinalizarRegistro},
    {path:'**',component:C404}
];
