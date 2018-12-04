import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Carro } from '../../models/carro';

const API = 'http://localhost:8080';

@Injectable()
export class CarrosServiceProvider {

  constructor(private http: HttpClient) { }

  lista() {
    return this.http.get<Carro[]>(API + '/api/carro/listaTodos');
  }

}
