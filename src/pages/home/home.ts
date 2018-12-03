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
    private loadingCtrl: LoadingController
    ) {

      let loading = this.loadingCtrl.create({
        content: 'Carregando...'
      });

      loading.present();

      this.http.get<Carro[]>(API + '/api/carro/listaTodos')
      .subscribe((carros) => {
        this.carros = carros;
        loading.dismiss();
      });
    }

}
