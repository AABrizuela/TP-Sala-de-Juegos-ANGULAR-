import { Injectable } from '@angular/core';
import { Juego } from '../clases/juego';
import { JuegoAdivina } from '../clases/juego-adivina';
import { MiHttpService } from './mi-http/mi-http.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class JuegoServiceService {

  peticion:any;
  constructor( public miHttp: MiHttpService, private firestore: AngularFirestore ) {
    this.peticion = this.miHttp.httpGetO("http://localhost:3003");
//    this.peticion = this.miHttp.httpGetO("https://restcountries.eu/rest/v2/all");
  }

  public listar(): Array<Juego> {
   this.miHttp.httpGetP("https://restcountries.eu/rest/v2/all")
    .then( data => {
      console.log( data );
    })
    .catch( err => {
      console.log( err );
    });


    this.peticion
    .subscribe( data => {
      console.log("En listar");
      console.log( data );
    }, err => {
      console.info("error: " ,err );
    })

    let miArray: Array<Juego> = new Array<Juego>();

    miArray.push(new JuegoAdivina("Juego 1", false));
    miArray.push(new JuegoAdivina("Pepe", true));
    miArray.push(new JuegoAdivina("Juego 3", false));
    miArray.push(new JuegoAdivina("Juego 4", false));
    miArray.push(new JuegoAdivina("Juego 5", false));
    miArray.push(new JuegoAdivina("Juego 6", false));
    return miArray;
  }

  public listarPromesa(): Promise<Array<Juego>> {
    this.peticion
    .subscribe( data => {
      console.log("En listarPromesa");
      console.log( data );
    }, err => {
      console.log( err );
    })
    let promesa: Promise<Array<Juego>> = new Promise((resolve, reject) => {
      let miArray: Array<Juego> = new Array<Juego>();
      miArray.push(new JuegoAdivina("JuegoPromesa 1", false,"promesa"));
      miArray.push(new JuegoAdivina("PepePromesa", true));
      miArray.push(new JuegoAdivina("JuegoPromesa 3", false));
      miArray.push(new JuegoAdivina("JuegoPromesa 4", false));
      miArray.push(new JuegoAdivina("JuegoPromesa 5", false));
      miArray.push(new JuegoAdivina("JuegoPromesa 6", false));
      resolve(miArray);
    });

    return promesa;
  }

  traerDB(value:string){
    return this.firestore.collection(value).valueChanges();;
  }

  crearDoc(db:string, nombre:string, juego:string){
    this.firestore.collection(db).doc(nombre).set(
      {
        gano: 0,
        perdio: 0,
        nombre: nombre,
        juego: juego
      }
    )
  }

  update(db:string, jugador){
    this.firestore.collection(db).doc(jugador.nombre).update(jugador)
  }

}
