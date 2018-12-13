import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert, AlertController } from 'ionic-angular';
import { Carro } from '../../models/carro';
import { AgendamentosServiceProvider } from '../../providers/agendamentos-service/agendamentos-service';
import { HomePage } from '../home/home';
import { Agendamento } from '../../models/agendamento';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';

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
    private alertCtrl: AlertController,
    private storage: Storage
  ) {
    this.carro = this.navParams.get('carroSelecionado');
    this.precoTotal = this.navParams.get('precoTotal');
  }

  agendar() {
    if (!this.nome || !this.endereco || !this.email) {
      this.alertCtrl.create({
        title: 'Campos Obrigatórios',
        subTitle: 'Preencha todos os campos!',
        buttons: [
          { text: 'ok' }
        ]
      }).present();

      return;
    }
    let agendamento: Agendamento = {
      nomeCliente: this.nome,
      enderecoCliente: this.endereco,
      emailCliente: this.email,
      modeloCarro: this.carro.nome,
      precoTotal: this.precoTotal,
      data: this.data,
      confirmado: false,
      enviado: false
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
      .mergeMap((valor) => {
        let observable = this.salva(agendamento);
        if (valor instanceof Error) {
          throw valor;
        }
        return observable;
      })
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
        (err: Error) => {
          mensagem.title = 'Aviso';
          mensagem.subtitle = err.message;
        }
      );
  }

  salva(agendamento: Agendamento) {
    let chave = this.email + this.data.substr(0, 10);
    let promise = this.storage.set(chave, agendamento);

    return Observable.fromPromise(promise);
  }

}
