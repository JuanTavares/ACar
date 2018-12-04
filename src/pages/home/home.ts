import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

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
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {

    let loading = this.loadingCtrl.create({
      content: 'Carregando...'
    });

    loading.present();

    this.http.get<Carro[]>(API + '/api/carro/listaTodos')
      .subscribe(
        (carros) => {
          this.carros = carros;
          loading.dismiss();
        },
        (err: HttpErrorResponse) => {
          loading.dismiss();
          this.alertCtrl.create({
            title: 'Falha na conexão',
            subTitle: 'Não foi possível carregar a lista de carros. Tente novamente mais tarde!',
            buttons: [{
              text: 'Ok'
            }]
          }).present();
        }
      );
  }

}
