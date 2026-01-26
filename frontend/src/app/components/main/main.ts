import { Component } from '@angular/core';
import { Conferencias } from '../conferencias/conferencias';
import { Resumen } from "../resumen/resumen";

@Component({
  selector: 'app-main',
  imports: [Conferencias, Resumen],
  templateUrl: './main.html',
  styleUrl: './main.css',
})
export class Main {

}
