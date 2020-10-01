import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import {Subscription} from "rxjs";
import {TimerObservable} from "rxjs/observable/TimerObservable";
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private subscription: Subscription;
  usuario = '';
  clave= '';
  progreso: number;
  progresoMensaje="esperando...";
  logeando=true;
  ProgresoDeAncho:string;

  clase="progress-bar progress-bar-info progress-bar-striped ";

  constructor(
    private route: ActivatedRoute,
    private router: Router, private authService: AuthService) {
      this.progreso=0;
      this.ProgresoDeAncho="0%";

  }

  ngOnInit() {
  }

  OnSubmitLogin()
  {
    this.authService.login(this.usuario, this.clave).then(res => {
      this.router.navigate(['/Principal']);
    }).catch(err => alert('Usuario o Contraseña incorrectas'))
  }

}
