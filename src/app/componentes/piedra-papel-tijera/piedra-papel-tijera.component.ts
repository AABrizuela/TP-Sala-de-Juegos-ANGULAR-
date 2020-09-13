import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-piedra-papel-tijera',
  templateUrl: './piedra-papel-tijera.component.html',
  styleUrls: ['./piedra-papel-tijera.component.css']
})
export class PiedraPapelTijeraComponent implements OnInit {

  public acumJug:number = 0;
  public acumMaq:number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  playerPick(seleccionJugador:string)
  {
    var elemJug;
    var elemMaq;

    elemMaq = this.machinePick();

    switch(seleccionJugador)
    {
      case "piedra":
        elemJug = <HTMLElement>document.querySelector("#btnPiedraJ");
        elemJug.style.backgroundColor = "#fcbf49";
        elemMaq.style.backgroundColor = "#fcbf49";
        this.disableButtons();
        this.pointCalc(elemJug.textContent, elemMaq.textContent);
        setTimeout(() => {
          elemJug.style.backgroundColor = "#f77f00";
          elemMaq.style.backgroundColor = "#f77f00";
          this.enableButtons();
        }, 2000);
        break;

      case "papel":
        elemJug = <HTMLElement>document.querySelector("#btnPapelJ");
        elemJug.style.backgroundColor = "#fcbf49";
        elemMaq.style.backgroundColor = "#fcbf49";
        this.disableButtons();
        this.pointCalc(elemJug.textContent, elemMaq.textContent);
        setTimeout(() => {
          elemJug.style.backgroundColor = "#f77f00";
          elemMaq.style.backgroundColor = "#f77f00";
          this.enableButtons();
        }, 2000);
        break;

      case "tijera":
        elemJug = <HTMLElement>document.querySelector("#btnTijeraJ");
        elemJug.style.backgroundColor = "#fcbf49";
        elemMaq.style.backgroundColor = "#fcbf49";
        this.disableButtons();
        this.pointCalc(elemJug.textContent, elemMaq.textContent);
        setTimeout(() => {
          elemJug.style.backgroundColor = "#f77f00";
          elemMaq.style.backgroundColor = "#f77f00";
          this.enableButtons();
        }, 2000);
        break;
    }
  }

  pointCalc(elemJug:any, elemMaq:any)
  {
    var cont
    var elemAux;

    if((elemMaq == "Piedra" && elemJug == "Tijera") ||
       (elemMaq == "Tijera" && elemJug == "Papel")  ||
       (elemMaq == "Papel" && elemJug == "Piedra"))
    {
      this.acumMaq++;
      elemAux = document.getElementById("puntosMaquina");
      elemAux.textContent = this.acumMaq;
      console.log(this.acumMaq);
    }
    else if((elemMaq == "Papel" && elemJug == "Tijera") ||
            (elemMaq == "Piedra" && elemJug == "Papel") ||
            (elemMaq == "Tijera" && elemJug == "Piedra"))
    {
      this.acumJug++;
      elemAux = document.getElementById("puntosJugador");
      elemAux.textContent = this.acumJug;
      console.log(this.acumJug);
    }
    else if(elemMaq == elemJug)
    {

    }
  }

  machinePick()
  {
    var rndNmbr:number;
    var elemMaq;

    rndNmbr = this.getRandomInt(3);

    switch(rndNmbr)
    {
      case 0:
        elemMaq = <HTMLElement>document.querySelector("#btnPiedraM");;
        break;

      case 1:
        elemMaq = <HTMLElement>document.querySelector("#btnPapelM");
        break;

      case 2:
        elemMaq = <HTMLElement>document.querySelector("#btnTijeraM");
        break;
    }

    return elemMaq;
  }

  disableButtons()
  {
    document.getElementById("btnPiedraJ").setAttribute("disabled", "");
    document.getElementById("btnPapelJ").setAttribute("disabled", "");
    document.getElementById("btnTijeraJ").setAttribute("disabled", "");
  }

  enableButtons()
  {
    document.getElementById("btnPiedraJ").removeAttribute("disabled");
    document.getElementById("btnPapelJ").removeAttribute("disabled");
    document.getElementById("btnTijeraJ").removeAttribute("disabled");
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
}
