import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { HttpErrorResponse } from '@angular/common/http';

import { Carro } from '../../models/carro';
import { CarrosServiceProvider } from '../../providers/carros-service/carros-service';
import { EscolhaPage } from '../escolha/escolha';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public carros: Carro[];

  constructor(
    public navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private carrosService: CarrosServiceProvider
  ) { }

  ionViewDidLoad(): void {

    let loading = this.loadingCtrl.create({
      content: 'Carregando...'
    });

    loading.present();

    this.carrosService.lista()
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

  selecionaCarro(carro:Carro) {
    this.navCtrl.push(EscolhaPage, {
      carroSelecionado: carro
    });
  }
}
