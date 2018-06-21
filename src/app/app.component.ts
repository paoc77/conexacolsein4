import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { HomePage } from '../pages/home/home';
import { VisitasPage } from '../pages/visitas/visitas';
import { GeoEmpresasPage } from '../pages/geoempresas/geoempresas';
import { BaseInstaladaPage } from '../pages/baseinstalada/baseinstalada';
import { DesactivacionPage } from '../pages/desactivacion/desactivacion';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, androidPermissions: AndroidPermissions) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
     { title: 'Inicio', component: HomePage }, 
      { title: 'Registrar Visita', component: VisitasPage },
      { title: 'GeoReferenciar Empresa', component: GeoEmpresasPage },      
      { title: 'Registrar Base Inst./Potencial', component: BaseInstaladaPage },
      { title: 'Desactivaciones', component: DesactivacionPage }        
    ];

    platform.ready().then(() => {

      androidPermissions.requestPermissions(
        [
          androidPermissions.PERMISSION.CAMERA, 
          androidPermissions.PERMISSION.CALL_PHONE, 
          androidPermissions.PERMISSION.GET_ACCOUNTS, 
          androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE, 
          androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE,
          androidPermissions.PERMISSION.READ_PHONE_STATE,
          androidPermissions.PERMISSION.ACCESS_FINE_LOCATION,
          androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION,
          androidPermissions.PERMISSION.INTERNET,
          androidPermissions.PERMISSION.ACCESS_NETWORK_STATE
        ]
      );

 }) 

  }


  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();    

    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
