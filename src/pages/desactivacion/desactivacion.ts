import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Geolocation } from '@ionic-native/geolocation';
import { Uid } from '@ionic-native/uid';
import { AndroidPermissions } from '@ionic-native/android-permissions';

@Component({
  selector: 'page-desactivacion',
  templateUrl: 'desactivacion.html'
})
export class DesactivacionPage {

  imei:string;


  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider, public geolocation: Geolocation, private uid: Uid, private androidPermissions: AndroidPermissions) {
    // If we navigated to this page, we will have an item available as a nav param
    
    this.imei='';    
    
    let self = this;


    (<any>window).plugins.imei.get(
      function(imeir) {
        console.log(imeir);
        self.imei=imeir;
      },
      function() {
        console.log("error loading imei");
      }
    )
  }  

  almuerzo() {
    this.restProvider.solicitarAlmuerzo(this.imei)
      .then(data => {
        alert('Solicitud registrada');
      });
  } 

 
}