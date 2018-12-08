import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Carro } from '../../models/carro';
import { Acessorio } from '../../models/acessorio';
import { CadastroPage } from '../cadastro/cadastro';

@IonicPage()
@Component({
  selector: 'page-escolha',
  templateUrl: 'escolha.html',
})
export class EscolhaPage {

  carro: Carro;
  acessorios: Acessorio[];
  precoTotal: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.carro = this.navParams.get('carroSelecionado');
    this.precoTotal = this.carro.preco;
    this.acessorios = [
      { nome: 'Freio ABS', preco: 800 },
      { nome: 'Ar-condicionado', preco: 1000 },
      { nome: 'MP3 Player', preco: 500 }
    ];
  }

  atualizaTotal(toggleState: boolean, acessorio: Acessorio) {
    toggleState ?
      this.precoTotal += acessorio.preco
      : this.precoTotal -= acessorio.preco;
  }
  avancaCadastro() {
    this.navCtrl.push(CadastroPage.name, {
      carroSelecionado: this.carro,
      precoTotal: this.precoTotal
    });
  }

}
