import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Geolocation } from '@ionic-native/geolocation';
import { Uid } from '@ionic-native/uid';
import { AndroidPermissions } from '@ionic-native/android-permissions';

@Component({
  selector: 'page-geoempresas',
  templateUrl: 'geoempresas.html'
})
export class GeoEmpresasPage {
  selectedItem: any;
  empresasL: any;
  empresa:{campoPersonalizado1:null,campoPersonalizado2:null,campoPersonalizado3:null,campoPersonalizado4:null,campoPersonalizado5:null,campoPersonalizado6:null,campoPersonalizado7:null,campoPersonalizado8:null,campoPersonalizado9:null,campoPersonalizado10:null,ciudad:null,contactos:null,direccion:null,email:null,fax:"",id:null,latitud:number,licencia:null,licenciaId:2,longitud:number,nit:"",nombre:"",pais:null,razonSocial:"",sucursales:null,telefono:"",tipo:null,url:null,usuarioAsignadoId:null,usuarioCreoId:null};
  icons: string[];
  nombreBuscar: string;
  empresas: Array<{ id: number, nombre: string }>;
  items: Array<{ title: string, note: string, icon: string }>;
  visitaTelefonica: boolean;
  visitaPresencial: boolean;
  latitude: any;
  longitude: any;
  tipoVisita: string;

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
    this.empresa = null;
    

    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

  buscarEmpresas() {
    this.restProvider.buscarEmpresas(this.nombreBuscar)
      .then(data => {
        this.empresasL = data;
        console.log(this.empresasL);
      });
  } 

  actualizarEmpresa() {
    alert('Latitud:'+this.empresa.latitud+' Longitud:'+this.empresa.longitud);
    this.restProvider.actualizarEmpresasGPS(this.empresa.id, this.empresa.latitud, this.empresa.longitud)
      .then(data => {
        alert('Empresa Actualizada Ok');
      });
  } 

  ubicacionActual() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.empresa.latitud = resp.coords.latitude;
      this.empresa.longitud = resp.coords.longitude;
      console.log(resp);
      console.log('lat:' +  this.empresa.latitud + ' lon:' + this.empresa.longitud);
    }).catch((error) => {
      console.log('Error getting location', error);
    });

  }

  seleccionarEmpresas(id){
     var filtrados = this.empresasL.filter(function(item){ return item.id==id });
     this.empresa=filtrados[0];
     this.ubicacionActual();
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(GeoEmpresasPage, {
      item: item
    });
  }  
}

/*campoPersonalizado1:null
campoPersonalizado2:null
campoPersonalizado3:null
campoPersonalizado4:null
campoPersonalizado5:null
campoPersonalizado6:null
campoPersonalizado7:null
campoPersonalizado8:null
campoPersonalizado9:null
campoPersonalizado10:null
ciudad:null
contactos:null
direccion:null
email:null
fax:"3464666"
id:8
latitud:"4.7933297999999995"
licencia:null
licenciaId:2
longitud:"-75.7135113"
nit:"900666539-0"
nombre:"global"
pais:null
razonSocial:"Globa Travel Ideas S.A.S"
sucursales:null
telefono:"3464666"
tipo:null
url:null
usuarioAsignadoId:null
usuarioCreoId:null
*/