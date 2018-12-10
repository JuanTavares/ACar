import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API = 'http://localhost:8080/api';

@Injectable()
export class AgendamentosServiceProvider {

  constructor(private http: HttpClient) { }

  agenda(agendamento) {
    return this.http.post(API + '/agendamento/agenda', agendamento);
  }

}
