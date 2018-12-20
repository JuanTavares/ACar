import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario';

const API = 'http://localhost:8080/api/login'

@Injectable()
export class UsuariosServiceProvider {

  usuarioLogado: Usuario;

  constructor(public http: HttpClient) { }

  efetuaLogin(email, senha) {
    return this.http
      .post(API, { email: email, senha: senha })
      .do((usuario: Usuario) => this.usuarioLogado = usuario);
  }

  obtemUsuarioLogado() {
    return this.usuarioLogado;
  }
}
