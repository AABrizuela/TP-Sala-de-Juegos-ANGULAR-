import { Component, OnInit, OnDestroy } from '@angular/core';
import * as $ from 'jquery';
import { Router } from '@angular/router';
//import { JuegoServiceService } from '../../servicios/juego-service.service';

@Component({
  selector: 'app-tateti',
  templateUrl: './tateti.component.html',
  styleUrls: ['./tateti.component.css']
})
export class TatetiComponent implements OnInit
{

  tablero = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];
  numNodes:number = 0;
  myMove:boolean = false;
  aiChar:string = "";
  humanChar:string = "";

  constructor(private route:Router) {

  }

  ngOnInit(): void {

  }

  getGanador(tablero)
  {
    // Check if someone won
    var vals = [true, false];
    var allNotNull = true;
    for (var k = 0; k < vals.length; k++) {
      var value = vals[k];

      // Check rows, columns, and diagonals
      var diagonalCompleta1 = true;
      var diagonalCompleta2 = true;
      for (var i = 0; i < 3; i++) {
        if (tablero[i][i] !== value) {
          diagonalCompleta1 = false;
        }
        if (tablero[2 - i][i] !== value) {
          diagonalCompleta2 = false;
        }
        var rowComplete = true;
        var colComplete = true;
        for (var j = 0; j < 3; j++) {
          if (tablero[i][j] != value) {
            rowComplete = false;
          }
          if (tablero[j][i] != value) {
            colComplete = false;
          }
          if (tablero[i][j] == null) {
            allNotNull = false;
          }
        }
        if (rowComplete || colComplete) {
          return value ? 1 : 0;
        }
      }
      if (diagonalCompleta1 || diagonalCompleta2) {
        return value ? 1 : 0;
      }
    }
    if (allNotNull) {
      return -1;
    }
    return null;
  }


  reiniciarJuego()
  {
    this.tablero = [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ];
    this.myMove = false;
    this.updMovimiento();
  }

  updMovimiento()
  {
    this.updBotones();
  var winner = this.getGanador(this.tablero);
  switch (winner) {
    case 1:
      alert("Perdiste!");
      this.reiniciarJuego();
      break;
    case 0:
      alert("Ganaste!");
      this.reiniciarJuego();
      break;
    case -1:
      alert("Empate!");
      this.reiniciarJuego();
      break;
  }
  $("#move").text(this.myMove ? "AI's Move" : "Your move");
  }

  updBotones()
  {
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        $("#c" + i + "" + j).text(this.tablero[i][j] === false ? this.humanChar : this.tablero[i][j] === true ? this.aiChar : " ");
      }
    }
  }

  miniMax(tablero, jugador)
  {
    this.numNodes++;
    var winner = this.getGanador(tablero);
    if (winner !== null) {
      switch (winner) {
        case 1:
          // AI wins
          return [1, tablero];
        case 0:
          // opponent wins
          return [-1, tablero];
        case -1:
          // Tie
          return [0, tablero];
      }
    } else {
      // Next states
      var nextVal = null;
      var nextBoard = null;

      for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
          if (tablero[i][j] === null) {
            tablero[i][j] = jugador;
            var value = this.miniMax(tablero, !jugador)[0];
            if ((jugador && (nextVal === null || value > nextVal)) || (!jugador && (nextVal === null || value < nextVal))) {
              nextBoard = tablero.map(function(arr) {
                return arr.slice();
              });
              nextVal = value;
            }
            tablero[i][j] = null;
          }
        }
      }
      return [nextVal, nextBoard];
    }
  }

  makeMove() {
    this.tablero = this.minimaxMove(this.tablero);
    console.log(this.numNodes);
    this.myMove = false;
    this.updMovimiento();
  }

  minimaxMove(tablero) {
    this.numNodes = 0;
    return this.miniMax(tablero, true)[1];
  }



  //updMovimiento();
  updateMovimiento(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  }
}
