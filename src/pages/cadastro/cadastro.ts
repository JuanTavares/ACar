import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert, AlertController } from 'ionic-angular';
import { Carro } from '../../models/carro';
import { AgendamentosServiceProvider } from '../../providers/agendamentos-service/agendamentos-service';
import { HomePage } from '../home/home';
import { stringify } from '@angular/compiler/src/util';

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {

  carro: Carro;
  precoTotal: number;

  nome: string = '';
  endereco: string = '';
  email: string = '';
  data: string = new Date().toISOString();

  alerta: Alert;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private agendamentosService: AgendamentosServiceProvider,
    private alertCtrl: AlertController
  ) {
    this.carro = this.navParams.get('carroSelecionado');
    this.precoTotal = this.navParams.get('precoTotal');
  }

  agendar() {
    let agendamento = {
      nomeCliente: this.nome,
      enderecoCliente: this.endereco,
      emailCliente: this.email,
      modeloCarro: this.carro,
      precoTotal: this.precoTotal,
      data: this.data
    };
    let mensagem = {
      title: '',
      subtitle: ''
    };

    this.alerta = this.alertCtrl.create({
      buttons: [
        {
          text: 'ok',
          handler: () => {
            this.navCtrl.setRoot(HomePage);
          }
        }
      ]
    });

    this.agendamentosService.agenda(agendamento)
      .finally(
        () => {
          this.alerta.setTitle(mensagem.title);
          this.alerta.setSubTitle(mensagem.subtitle);
          this.alerta.present();
        }
      )
      .subscribe(
        () => {
          mensagem.title = 'Parabéns!';
          mensagem.subtitle = 'Agendamento realizado com sucesso.';
        },
        () => {
          mensagem.title = 'Aviso';
          mensagem.subtitle = 'Falha no agendamento! Tente novamente mais tarde.';
        }
      );
  }

}
