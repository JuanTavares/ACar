import { Injectable } from '@angular/core';
import { Agendamento } from '../../models/agendamento';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';

@Injectable()
export class AgendamentoDaoProvider {

  constructor(private storage: Storage) { }

  private geraChave(agendamento: Agendamento) {
    return agendamento.emailCliente + agendamento.data.substr(0, 10);
  }

  salva(agendamento: Agendamento) {
    let chave = this.geraChave(agendamento);
    let promise = this.storage.set(chave, agendamento);

    return Observable.fromPromise(promise);
  }
}
