import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';
import { JuegoAgilidad } from '../../clases/juego-agilidad'

import {Subscription} from "rxjs";
import {TimerObservable} from "rxjs/observable/TimerObservable";
import { stringify } from 'querystring';
import { ResJuegosService } from '../../servicios/res-juegos.service';

@Component({
  selector: 'app-agilidad-aritmetica',
  templateUrl: './agilidad-aritmetica.component.html',
  styleUrls: ['./agilidad-aritmetica.component.css']
})
export class AgilidadAritmeticaComponent implements OnInit {
   @Output()
  enviarJuego :EventEmitter<any>= new EventEmitter<any>();
  nuevoJuego : JuegoAgilidad;
  //ocultarVerificar: boolean;
  Tiempo: number;
  repetidor:any;
  primerNum:number = 0;
  segundoNum:number = 0;
  operando:string;
  operandos = ['+', '-', '*', '/'];
  resultado:number;
  resultadoReal:number;
  private subscription: Subscription;

  ngOnInit() {
  }
   constructor(private res: ResJuegosService) {
    //this.ocultarVerificar=true;
    this.Tiempo=5;
    this.nuevoJuego = new JuegoAgilidad();
    console.info("Inicio agilidad");
  }

  NuevoJuego() {
    this.nuevoJuego = true;
    this.ocultarVerificar();

    this.primerNum = this.getRandomInt(10)+1;
    this.segundoNum = this.getRandomInt(10)+1;
    this.operando = this.operandos[this.getRandomInt(4)];
    this.resultado = null;

    switch(this.operando)
    {
      case '+':
        this.resultadoReal = this.primerNum + this.segundoNum;
        break;

      case '-':
        this.resultadoReal = this.primerNum - this.segundoNum;
        break;

      case '*':
        this.resultadoReal = this.primerNum * this.segundoNum;
        break;

      case '/':
      this.resultadoReal = this.primerNum / this.segundoNum;
      break;
    }

    this.repetidor = setInterval(()=>{
      this.Tiempo--;
      //console.log(this.verificar());
      if(this.Tiempo==0 ) {
        clearInterval(this.repetidor);
        //this.verificar();
        this.Tiempo=5;
      }
      }, 900);

      document.getElementById("btnNuevo").setAttribute("disabled", "true");
  }

  verificar()
  {
    clearInterval(this.repetidor);

    if(this.resultado == this.resultadoReal)
    {
      document.getElementById("btnNuevo").hidden = false;
      document.getElementById("btnNuevo").removeAttribute("disabled");
      document.getElementById("btnVerificar").hidden = false;
      document.getElementById("success").hidden = false;
      document.getElementById("fail").hidden = true;
      this.nuevoJuego = false;
      this.ocultarVerificar;
      this.res.guardarResultado('Agilidad aritmetica', 'Gano');
      return true;
    }
    else
    {
      document.getElementById("fail").hidden = false;
      this.res.guardarResultado('Agilidad aritmetica', 'Perdio');
      return false;
    }

  }

  ocultarVerificar()
  {
    if(this.nuevoJuego==true)
    {
      document.getElementById("btnVerificar").hidden = false;
      document.getElementById("spinJuego").hidden = false;
      document.getElementById("success").hidden = true;
      return false;
    }
    else
    {
      document.getElementById("btnVerificar").hidden = true;
      return true;
    }
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
}
