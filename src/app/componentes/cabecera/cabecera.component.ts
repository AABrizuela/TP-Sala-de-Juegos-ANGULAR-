import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {

  loggedUsr: any;
  usrMail: any;

  constructor(private authService: AuthService) {
    this.authService.getCurrentUser().then((response:any) => {
      if(response)
      {
        this.usrMail = response.email;
      }
    }).catch((error:any) => console.log(error));
  }

  ngOnInit() {

  }

  logout()
  {
    this.authService.logout();
  }
}
