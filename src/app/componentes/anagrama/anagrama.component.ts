import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-anagrama',
  templateUrl: './anagrama.component.html',
  styleUrls: ['./anagrama.component.css']
})
export class AnagramaComponent implements OnInit {

  palabra:string;
  palabrasArray = ["helicoptero", "cereal", "musica", "videojuegos", "television", "murcielago"];
  letrasArray = [];
  palabraDesordenada:string;
  respuesta:string;
  respuestaReal:string;
  label:boolean;

  constructor() {
    this.label = true;
  }

  ngOnInit() {
  }

  JuegoNuevo()
  {
    this.respuestaReal = this.palabrasArray[this.getRandomInt(6)+1]
    this.palabraDesordenada = this.mezclar(this.respuestaReal);

    this.verificar()

    console.log(this.respuesta);
  }

  verificar()
  {
    if(this.respuesta == this.respuestaReal)
    {
      this.label = false;
    }
    else
    {
      this.label = true;
    }

    return this.label;
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  mezclar(string) {
    var array = string.split("");
    var i;

    for(i=0; i < array.length; i++) {
      const y = Math.floor(Math.random() * (i + 1));
      [array[i], array[y]] = [array[y], array[i]];
    }
    return array.join("");
  }
}
