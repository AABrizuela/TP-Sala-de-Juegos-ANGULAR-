import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ResJuegosService {

  registro:string;

  constructor(private db: AngularFireDatabase, private authService: AuthService) { }

  guardarResultado(juego:string,resultado:any){
    this.authService.getCurrentUser().then((response: any) => {
      this.registro = response.email.split('@');
      let fecha:any = Date.now();
    this.db.list('resultados').set(this.registro[0]+'_'+juego+fecha, { usuario:response.email, juego: juego, resultado:resultado });
  });
}
}
