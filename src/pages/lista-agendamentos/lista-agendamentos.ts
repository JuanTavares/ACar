import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Alert } from 'ionic-angular';
import { AgendamentoDaoProvider } from '../../providers/agendamento-dao/agendamento-dao';
import { Agendamento } from '../../models/agendamento';
import { AgendamentosServiceProvider } from '../../providers/agendamentos-service/agendamentos-service';

@IonicPage()
@Component({
  selector: 'page-lista-agendamentos',
  templateUrl: 'lista-agendamentos.html',
})
export class ListaAgendamentosPage {

  agendamentos: Agendamento[];
  alerta: Alert;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private agendamentosService: AgendamentosServiceProvider,
    private agendamentoDao: AgendamentoDaoProvider
  ) { }

  ionViewDidLoad() {
    this.agendamentoDao.listaTodos()
      .subscribe(
        (agendamentos: Agendamento[]) => {
          this.agendamentos = agendamentos;
        }
      )
  }

  reenvia(agendamento: Agendamento) {

    let mensagem = {
      title: '',
      subtitle: ''
    };

    this.alerta = this.alertCtrl.create({
      buttons: [
        {
          text: 'ok'
        }
      ]
    });

    this.agendamentosService.agenda(agendamento)
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
          mensagem.subtitle = 'Agendamento reenviado com sucesso.';
        },
        (err: Error) => {
          mensagem.title = 'Aviso';
          mensagem.subtitle = err.message;
        }
      );
  }

}
