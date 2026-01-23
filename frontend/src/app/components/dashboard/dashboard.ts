import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { autenticarPanelAdmin } from '../../core/services/utils.service';

@Component({
  selector: 'app-dashboard',
  imports: [ReactiveFormsModule, RouterLink, RouterLinkActive],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  miForm: FormGroup;
  titulo: string = 'Panel de administración';

  constructor(private router: Router) {
    this.miForm = new FormGroup({}, []);
  }

  ngOnInit(): void {
    autenticarPanelAdmin(this.router);
  }

}
