import { Component } from '@angular/core';
import { Conferencias } from '../conferencias/conferencias';
import { Resumen } from "../resumen/resumen";
import { Speakers } from '../speakers/speakers';

@Component({
  selector: 'app-main',
  imports: [Conferencias, Resumen,Speakers],
  templateUrl: './main.html',
  styleUrl: './main.css',
})
export class Main {

}
