import { Component, OnInit , Input, EventEmitter} from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-listado-de-resultados',
  templateUrl: './listado-de-resultados.component.html',
  styleUrls: ['./listado-de-resultados.component.css']
})
export class ListadoDeResultadosComponent implements OnInit {

  resultados: Observable<any[]>;
  listaResultados: any[];

  constructor(private dataBase: AngularFireDatabase) {
   }

  ngOnInit() {
    this.resultados = this.dataBase.list('resultados').valueChanges();
    this.resultados.subscribe( resultados => this.listaResultados = resultados, error => console.log(error));
  }
}
