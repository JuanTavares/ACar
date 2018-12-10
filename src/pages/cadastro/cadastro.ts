import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert, AlertController } from 'ionic-angular';
import { Carro } from '../../models/carro';
import { AgendamentosServiceProvider } from '../../providers/agendamentos-service/agendamentos-service';

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

    this.alerta = this.alertCtrl.create({
      buttons: [
        { text: 'ok' }
      ]
    });

    this.agendamentosService.agenda(agendamento)
      .subscribe(
        () => {
          this.alerta.setTitle('Parabéns!');
          this.alerta.setSubTitle('Agendamento realizado com sucesso.');
          this.alerta.present();
        },
        () => {
          this.alerta.setTitle('Aviso');
          this.alerta.setSubTitle('Falha no agendamento! Tente novamente mais tarde.');
          this.alerta.present();
        }
      );
  }

}
