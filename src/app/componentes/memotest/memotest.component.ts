import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-memotest',
  templateUrl: './memotest.component.html',
  styleUrls: ['./memotest.component.scss']
})
export class MemotestComponent implements OnInit {

  private images = [
    { id: 1, url: '/assets/imagenes/groot.png' },
    { id: 2, url: '/assets/imagenes/thor.png' },
    { id: 3, url: '/assets/imagenes/starlord.png' },
    { id: 4, url: '/assets/imagenes/rocket.png' }
  ];
  public imagesInact = '/assets/imagenes/marvel.png';
  public cards: Array<any>;
  private lastSelectId;
  private aciertos = 4;
  private countAciertos: number;
  public contIntentos: number;
  public msgResultado: string;

  constructor() { }

  ngOnInit(): void {
    this.IniciarJuego();
  }

  IniciarJuego() {
    this.cards = [];
    this.lastSelectId = null;
    this.countAciertos = 0;
    this.contIntentos = 0;
    this.msgResultado = '';
    let countIndex = 0;

    for (let i = 0; i < this.aciertos * 2; i++) {
      if (countIndex === this.aciertos) {
        countIndex = 0;
      }

      const img = this.images[countIndex];

      this.cards.push({
        id: img.id,
        url: img.url,
        visible: false, // si la imagen se muestra
        active: true // seleccionable
      });
      countIndex++;
    }
    this.RandomArray(this.cards);
  }

  CardSelected(idx) {
    if (!this.cards[idx].active) {
      return;
    }
    this.cards[idx].visible = true;

    if (this.lastSelectId == null) {
      this.lastSelectId = idx;
      this.cards[idx].visible = true;
      this.cards[idx].active = false;
    } else {
      if (this.cards[this.lastSelectId].id === this.cards[idx].id) {
        // Si coinciden, se aumentan los aciertos
        this.countAciertos = this.countAciertos + 1;
        this.cards[idx].visible = true;
        this.cards[idx].active = false;
        this.lastSelectId = null;
      } else {
        // Si no hacen pareja, oculto las cartas luego de esperar medio segundo
        setTimeout(() => {
          this.cards[this.lastSelectId].visible = false; // Ocultar
          this.cards[this.lastSelectId].active = true; // Activar
          this.cards[idx].visible = false;
          this.lastSelectId = null;
        }, 0.5 * 1000);

      }
    }
    if (this.aciertos === this.countAciertos) {
      this.msgResultado = 'Juego terminado en ' + this.contIntentos + ' intento/s.';
      // console.log(this.msgResultado);
    }
    this.contIntentos++;
  }

  RandomArray(array) {
    let currentIndex = array.length;
    let randomIndex;
    let temporaryValue;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
}
