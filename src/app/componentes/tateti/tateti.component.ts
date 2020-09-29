import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-tateti',
  templateUrl: './tateti.component.html',
  styleUrls: ['./tateti.component.css']
})
export class TatetiComponent implements OnInit
{

  isHumanTurn: boolean = true;
  isHumanWinner: boolean = false;
  isComputerWinner:boolean = false;
  isTie:boolean = false;
  tracker: string[] = new Array(9).fill(null);

  tiles: Tile[] = [
    {text: '', cols: 1, rows: 1, color: '#f77f00'},
    {text: '', cols: 1, rows: 1, color: '#f77f00'},
    {text: '', cols: 1, rows: 1, color: '#f77f00'},
    {text: '', cols: 1, rows: 1, color: '#f77f00'},
    {text: '', cols: 1, rows: 1, color: '#f77f00'},
    {text: '', cols: 1, rows: 1, color: '#f77f00'},
    {text: '', cols: 1, rows: 1, color: '#f77f00'},
    {text: '', cols: 1, rows: 1, color: '#f77f00'},
    {text: '', cols: 1, rows: 1, color: '#f77f00'}
  ];

  constructor(private route:Router) {

  }

  ngOnInit(): void {

  }

  setMove(index: number)
  {
    if(this.tracker[index] == null && this.isComputerWinner == false && this.isHumanWinner == false)
    {
      this.tracker[index] = 'X';
      this.tiles[index].text = 'X';
      this.isHumanWinner = this.checkIfWinner();
      this.isHumanTurn = false;
      if(!this.isHumanWinner)
      {
        this.findMove(index);
        this.isComputerWinner = this.checkIfWinner();
        if(this.isComputerWinner)
        {
          this.isHumanTurn = false;
        }
      }
    }
  }

  checkIfWinner(): boolean
  {
    if(this.tracker[0] == this.tracker[1] && this.tracker[0] == this.tracker[2] && this.tracker[0] != null
       || this.tracker[3] == this.tracker[4] && this.tracker[3] == this.tracker[5] && this.tracker[3] != null
       || this.tracker[6] == this.tracker[7] && this.tracker[6] == this.tracker[8] && this.tracker[6] != null
       || this.tracker[0] == this.tracker[3] && this.tracker[0] == this.tracker[6] && this.tracker[0] != null
       || this.tracker[1] == this.tracker[4] && this.tracker[1] == this.tracker[7] && this.tracker[1] != null
       || this.tracker[2] == this.tracker[5] && this.tracker[2] == this.tracker[8] && this.tracker[2] != null
       || this.tracker[0] == this.tracker[4] && this.tracker[0] == this.tracker[8] && this.tracker[0] != null
       || this.tracker[2] == this.tracker[4] && this.tracker[2] == this.tracker[6] && this.tracker[2] != null)
    {
      return true;
    }

    return false;
  }

  findMove(index)
  {
    let isMoved = false;
    var possibleMoveIndex = Math.floor(Math.random() * 9)
    var findCounter: number = 0;

    do
    {
      if(this.tracker[possibleMoveIndex] == null && this.tracker[possibleMoveIndex] != index)
      {
        this.tracker[possibleMoveIndex] = 'O';
        this.tiles[possibleMoveIndex].text = 'O';
        this.isHumanTurn = true;
        isMoved = true;
      }
      else
      {
        possibleMoveIndex = Math.floor(Math.random() * 9)
        findCounter++
      }

      if(findCounter == 18)
      {
        this.isTie = true;
        break;
      }
    }while(this.isHumanTurn == false)
  }
}
