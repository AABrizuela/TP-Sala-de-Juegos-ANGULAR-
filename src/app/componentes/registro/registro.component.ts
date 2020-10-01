import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { AuthService } from '../../servicios/auth.service';

//para poder hacer las validaciones
//import { Validators, FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario;
  clave;
  confirmaClave;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  OnSubmitRegister()
  {
    if(this.clave == this.confirmaClave)
    {
      this.authService.register(this.usuario, this.clave).then(res => {
        this.router.navigate(['/Principal']);
      }).catch(err => alert('Usuario o Contraseña incorrectas'))
    }
  }
}
