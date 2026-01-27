import { Component } from '@angular/core';
import { Conferencias } from '../conferencias/conferencias';
import { Resumen } from "../resumen/resumen";
import { Speakers } from '../speakers/speakers';
import { Boletos } from '../boletos/boletos';

@Component({
  selector: 'app-main',
  imports: [Conferencias, Resumen, Speakers, Boletos],
  templateUrl: './main.html',
  styleUrl: './main.css',
})
export class Main {

}
