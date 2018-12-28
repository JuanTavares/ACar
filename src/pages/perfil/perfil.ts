import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, normalizeURL } from 'ionic-angular';
import { UsuariosServiceProvider } from '../../providers/usuarios-service/usuarios-service';
import { Camera } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private usuariosService: UsuariosServiceProvider,
    private camera: Camera
  ) {
  }

  get usuarioLogado() {
    return this.usuariosService.obtemUsuarioLogado();
  }

  tiraFoto() {
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.FILE_URI,
      saveToPhotoAlbum: true,
      correctOrientation: true
    })
      .then(fotoUri => {
        fotoUri = normalizeURL(fotoUri);
        this.usuariosService.salvaAvatar(fotoUri);
      })
      .catch(err => console.log(err));
  }

  get avatar() {
    return this.usuariosService.obtemAvatar();
  }

}
