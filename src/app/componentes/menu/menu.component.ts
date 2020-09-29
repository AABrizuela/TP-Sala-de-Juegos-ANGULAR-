import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    public router: Router) { }

  ngOnInit() {
  }

  mostrarVolver(ruta)
  {
    //mostrar volver cuando estoy en ruta especifica, hacer switch para ver en que ruta estoy
    switch(ruta)
    {
      case '/Juegos/Anagrama':
        return true;
        break;
      case '/Juegos/PPT':
        return true;
      break;
      case '/Juegos/Adivina':
        return true;
      break;
      case '/Juegos/Agilidad':
        return true;
      break;
      case '/Juegos/Tateti':
        return true;
      break;
      case '/Juegos/Memotest':
        return true;
      break;
      case '/Juegos/Reflejos':
        return true;
      break;
    }
  }
}
