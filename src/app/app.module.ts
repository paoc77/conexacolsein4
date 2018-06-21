import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation';
import { Uid } from '@ionic-native/uid';
import { AndroidPermissions } from '@ionic-native/android-permissions'; 

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { VisitasPage } from '../pages/visitas/visitas';
import { GeoEmpresasPage } from '../pages/geoempresas/geoempresas';
import { BaseInstaladaPage } from '../pages/baseinstalada/baseinstalada';
import { DesactivacionPage } from '../pages/desactivacion/desactivacion';




import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RestProvider } from '../providers/rest/rest';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    VisitasPage,
    GeoEmpresasPage,
    BaseInstaladaPage,
    DesactivacionPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    VisitasPage,
    GeoEmpresasPage,
    BaseInstaladaPage,
    DesactivacionPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider,
    Geolocation,
    Uid,
    AndroidPermissions
  ]
})
export class AppModule {}
