import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Geolocation } from '@ionic-native/geolocation';
import { Uid } from '@ionic-native/uid';
import { AndroidPermissions } from '@ionic-native/android-permissions';

@Component({
  selector: 'page-visitas',
  templateUrl: 'visitas.html'
})
export class VisitasPage {
  selectedItem: any;
  empresasL: any;
  imei:string;
  icons: string[];
  nombreBuscar: string;
  empresas: Array<{ id: number, nombre: string }>;
  items: Array<{ title: string, note: string, icon: string }>;
  visitaTelefonica: boolean;
  visitaPresencial: boolean;
  latitude: any;
  longitude: any;
  tipoVisita: string;
  motivoVisita: string;
  empresaId:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider, public geolocation: Geolocation, private uid: Uid, private androidPermissions: AndroidPermissions) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    this.visitaTelefonica = false;
    this.visitaPresencial = false;
    // Let's populate this page with some filler content for funzies
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
      'american-football', 'boat', 'bluetooth', 'build'];
    this.nombreBuscar = '';
    this.items = [];
    this.empresas = [];
    this.empresasL = [];
    this.tipoVisita = '';
    this.motivoVisita = '';
    this.imei='';
    this.empresaId=0;
    
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }

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
  

  buscarEmpresas() {
   // this.getImei();
    this.restProvider.buscarEmpresas(this.nombreBuscar)
      .then(data => {
        this.empresasL = data;
        console.log(this.empresasL);
      });
  }

  guardarVisita(){
    
    var tipo='';
    if(this.tipoVisita=='T') tipo='Telefonica';
    if(this.tipoVisita=='P') tipo='Presencial';
    
    this.restProvider.guardarVisita(this.empresaId,this.motivoVisita,this.tipoVisita,this.imei)
      .then(data => {        
        alert('Visita Registrada');
      }).catch(error => {
        alert(error);
      });
  }

  cambiarTipoVisita() {
    if (this.tipoVisita == "P") {      
      this.geolocation.getCurrentPosition().then((resp) => {
        this.latitude = resp.coords.latitude;
        this.longitude = resp.coords.longitude;
        console.log(resp);
        console.log('lat:' + this.latitude + ' lon:' + this.longitude);
        this.restProvider.buscarEmpresasGPS(this.latitude, this.longitude)
          .then(data => {
            this.empresasL = data;
            console.log(this.empresasL);
          });

      }).catch((error) => {
        console.log('Error getting location', error);
      });
    }

  }

  ubicacionActual() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      console.log(resp);
      console.log('lat:' + this.latitude + ' lon:' + this.longitude);
    }).catch((error) => {
      console.log('Error getting location', error);
    });

  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(VisitasPage, {
      item: item
    });
  }

  async getImei() {
    const { hasPermission } = await this.androidPermissions.checkPermission(
      this.androidPermissions.PERMISSION.READ_PHONE_STATE
    );

    if (!hasPermission) {
      const result = await this.androidPermissions.requestPermission(
        this.androidPermissions.PERMISSION.READ_PHONE_STATE
      );

      if (!result.hasPermission) {        
        throw new Error('Permissions required');
      }

      // ok, a user gave us permission, we can get him identifiers after restart app
      return;
    }

    var imeilocal = '';
    
    (<any>window).plugins.imei.get(
      function(imeir) {
        console.log(imeir);
        imeilocal=imeir;
        this.imei=imeir;
        //return imeir;
      },
      function() {
        console.log("error loading imei");
      }
    );

    this.imei = imeilocal;
    return imeilocal;
  }
}
