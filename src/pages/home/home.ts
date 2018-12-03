import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

import { Carro } from '../../models/carro';

const API = 'http://localhost:8080'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public carros: Carro[];

  constructor(
    public navCtrl: NavController,
    private http: HttpClient,
    ) {

      this.http.get<Carro[]>(API + '/api/carro/listaTodos')
      .subscribe((carros) => {
        this.carros = carros;
      });
    }

}
