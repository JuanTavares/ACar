import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListaAgendamentosPage } from '../pages/lista-agendamentos/lista-agendamentos';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;

  @ViewChild(Nav) public nav: Nav;
  public paginas = [
    { titulo: 'agendamentos', pagina: ListaAgendamentosPage.name, icone: 'calendar' }
  ]

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  navegarPara(pagina) {
    this.nav.push(pagina);
  }
}

