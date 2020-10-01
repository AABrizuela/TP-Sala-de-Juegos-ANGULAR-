import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  public status: any = {
    isFirstOpen: true,
    isFirstDisabled: false
  };
  usuario: any;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.getCurrentUser().then((response:any) => {
      if(response)
      {
        this.usuario = response.email;
      }
    }).catch((error:any) => console.log(error));
   }

  ngOnInit() {

  }

  isLogged()
  {
    if(this.usuario == null)
    {
      this.router.navigate(['/Login']);
    }
    else if(this.usuario != null)
    {
      this.router.navigate(['/Juegos']);
    }
  }

}
