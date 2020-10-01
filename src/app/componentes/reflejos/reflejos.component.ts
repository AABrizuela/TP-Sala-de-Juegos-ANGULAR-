import { Component, OnInit } from '@angular/core';
import { ResJuegosService } from '../../servicios/res-juegos.service';

@Component({
  selector: 'app-reflejos',
  templateUrl: './reflejos.component.html',
  styleUrls: ['./reflejos.component.css']
})
export class ReflejosComponent implements OnInit {

  mostrarRojo:boolean = false;
  mostrarVerde:boolean = false;
  resultadoPos:boolean = false;
  resultadoNeg:boolean = false;
  reaccion:Date;
  tiempoReaccion:number = 0;
  temp;

  constructor(private resultado: ResJuegosService) { }

  ngOnInit(): void {

  }

  empezar()
  {
    console.log("empezar");
    document.getElementById("divInicio").setAttribute("hidden", "");
    this.mostrarRojo = true;
    this.temp = setTimeout(() => {
      document.getElementById("divRojo").setAttribute("hidden", "");
      this.mostrarVerde = true;
      console.log(this.temp);
      this.reaccion = new Date();
    }, Math.floor( 1000 + Math.random() * 3000));
  }

  clickVerde()
  {
    var ahora = new Date()
    this.tiempoReaccion = ahora.getTime() - this.reaccion.getTime();
    document.getElementById("divClick").setAttribute("hidden", "");
    this.resultadoPos = true;
    this.resultado.guardarResultado('Reflejos', 'Gano');
  }

  clickRojo()
  {
    this.resultadoNeg = true;
    clearTimeout(this.temp);
    document.getElementById("divRojo").setAttribute("hidden", "");
  }

  reset()
  {
    this.mostrarRojo = false;
    this.mostrarVerde = false;
    this.resultadoPos = false;
    this.resultadoNeg = false;
    clearTimeout(this.temp);
    document.getElementById("divInicio").removeAttribute("hidden");
    document.getElementById("divRojo").removeAttribute("hidden");
    document.getElementById("divClick").removeAttribute("hidden");
  }
}
