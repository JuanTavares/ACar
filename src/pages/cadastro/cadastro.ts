import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert, AlertController } from 'ionic-angular';
import { Carro } from '../../models/carro';
import { AgendamentosServiceProvider } from '../../providers/agendamentos-service/agendamentos-service';
import { HomePage } from '../home/home';
import { Agendamento } from '../../models/agendamento';
import { AgendamentoDaoProvider } from '../../providers/agendamento-dao/agendamento-dao';
import { Vibration } from '@ionic-native/vibration';
import { DatePicker } from '@ionic-native/date-picker';

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
    private agendamentoDao: AgendamentoDaoProvider,
    private vibration: Vibration,
    private datePicker: DatePicker
  ) {
    this.carro = this.navParams.get('carroSelecionado');
    this.precoTotal = this.navParams.get('precoTotal');
  }

  selecionaData() {
    this.datePicker.show({
      date: new Date(),
      mode: 'date'
    })
      .then(data => this.data = data.toISOString());
  }

  agendar() {
    if (!this.nome || !this.endereco || !this.email) {

      this.vibration.vibrate(500);

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

    this.agendamentoDao.verificaDuplicado(agendamento)
      .mergeMap(verificaDuplicado => {
        if (verificaDuplicado) {
          throw new Error('Agendamento já existe!')
        }
        return this.agendamentosService.agenda(agendamento);
      })
      .mergeMap((valor) => {
        let observable = this.agendamentoDao.salva(agendamento);
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

}
