import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { UsuariosServiceProvider } from '../../providers/usuarios-service/usuarios-service';
import { Usuario } from '../../models/usuario';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email: string;
  senha: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private usuariosService: UsuariosServiceProvider,
    private alertCtrl: AlertController
  ) {
  }

  efetuaLogin() {
    this.usuariosService
      .efetuaLogin(this.email, this.senha)
      .subscribe(
        (usuario: Usuario) => {
          console.log(usuario);
          this.navCtrl.setRoot(HomePage)
        },
        () => {
          this.alertCtrl.create({
            title: 'Oops!',
            subTitle: 'Email ou senha incorretos',
            buttons: [{ text: 'Ok' }]
          }).present();
        });
  }

}
