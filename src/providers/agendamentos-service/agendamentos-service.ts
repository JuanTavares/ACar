import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Agendamento } from '../../models/agendamento';

const API = 'http://localhost:8080/api';

@Injectable()
export class AgendamentosServiceProvider {

  constructor(private http: HttpClient) { }

  agenda(agendamento: Agendamento) {
    return this.http.post(API + '/agendamento/agenda', agendamento)
    .do(() => agendamento.enviado = true);
  }

}
