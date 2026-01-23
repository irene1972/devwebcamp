import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-regalos',
  imports: [ReactiveFormsModule,RouterLink,RouterLinkActive],
  templateUrl: './regalos.html',
  styleUrl: './regalos.css',
})
export class Regalos {
  miForm: FormGroup;
  titulo: string = 'Regalos';

  constructor() {
    this.miForm = new FormGroup({}, []);
  }

}
