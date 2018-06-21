import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Geolocation } from '@ionic-native/geolocation';
import { Uid } from '@ionic-native/uid';
import { AndroidPermissions } from '@ionic-native/android-permissions';

@Component({
  selector: 'page-baseinstalda',
  templateUrl: 'baseinstalada.html'
})
export class BaseInstaladaPage {
  selectedItem: any;
  empresasL: any;
  base:any;
  empresa:{campoPersonalizado1:null,campoPersonalizado2:null,campoPersonalizado3:null,campoPersonalizado4:null,campoPersonalizado5:null,campoPersonalizado6:null,campoPersonalizado7:null,campoPersonalizado8:null,campoPersonalizado9:null,campoPersonalizado10:null,ciudad:null,contactos:null,direccion:null,email:null,fax:"",id:null,latitud:number,licencia:null,licenciaId:2,longitud:number,nit:"",nombre:"",pais:null,razonSocial:"",sucursales:null,telefono:"",tipo:null,url:null,usuarioAsignadoId:null,usuarioCreoId:null};
  baseinstalada:any;
  potencialcompra:any;
  icons: string[];
  nombreBuscar: string;
  empresas: Array<{ id: number, nombre: string }>;
  items: Array<{ title: string, note: string, icon: string }>;
  visitaTelefonica: boolean;
  visitaPresencial: boolean;
  latitude: any;
  longitude: any;
  tipoVisita: string;
  lineas:any;
  familias:any;
  lineaid:any;
  familiaid:any;
  imei:string;


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
    this.lineas = [];
    this.familias = [];    
    this.base = {};    
    this.lineaid = 0;
    this.familiaid = 0; 
    this.baseinstalada = {};
    this.baseinstalada.estadoBasePotencial = {};
    this.baseinstalada.estadoBasePotencial.nombre = "N/A";
    this.potencialcompra = {};
    this.potencialcompra.estadoBasePotencial = {};
    this.potencialcompra.estadoBasePotencial.nombre = "N/A";
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

  traerLineas(){
    this.restProvider.buscarLineas()
      .then(data => {
        this.lineas = data;
      });
  }

  traerFamilias(lineaid){    
    this.restProvider.buscarFamilias(lineaid)
      .then(data => {        
        this.familias = data;
      });
  }

  traerBase(empresaid,lineaid,familiaid){
    this.restProvider.buscarBase(empresaid,lineaid,familiaid)
      .then((data:any) => {
        console.log(data);
        if(data.estadoBasePotencial==null){
          data.estadoBasePotencial = {};
          data.estadoBasePotencial.nombre = "N/A";
        }
        this.baseinstalada = data;
      });
  }

  traerPotencial(empresaid,lineaid,familiaid){
    this.restProvider.buscarPotencial(empresaid,lineaid,familiaid)
    .then((data:any) => {
      console.log(data);
      if(data.estadoBasePotencial==null){
        data.estadoBasePotencial = {};
        data.estadoBasePotencial.nombre = "N/A";
      }
      this.potencialcompra = data;
    });      
  }

  cambiarLinea(evt){   
    this.lineaid=evt; 
    this.baseinstalada.LineaId=evt;
    this.potencialcompra.LineaId=evt;
    console.log(evt);
    this.traerFamilias(evt);
  }

  cambiarFamilia(evt){        
    this.familiaid=evt;
    this.baseinstalada.FamiliaId=evt;
    this.potencialcompra.FamiliaId=evt;
    this.traerBase(this.empresa.id, this.lineaid,this.familiaid);
    this.traerPotencial(this.empresa.id, this.lineaid,this.familiaid);
  }

  seleccionarEmpresas(id){
     var filtrados = this.empresasL.filter(function(item){ return item.id==id });
     this.empresa=filtrados[0];
     this.baseinstalada.EmpresaId=this.empresa;
     this.potencialcompra.EmpresaId=this.empresa;
     this.ubicacionActual();
     this.traerLineas();
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(BaseInstaladaPage, {
      item: item
    });
  }  

  guardarBasePotencial(){
    this.guardarBase();
    this.guardarPotencial();
  }

  guardarBase(){
    console.log(this.baseinstalada);
    var b = this.baseinstalada;
    this.restProvider.guardarBase(b.empresaId,b.lineaId,b.familiaId,b.estadoBasePotencialId,b.cantidad,b.valorunitario,this.imei,b.id)
      .then(data => {
        alert('Base Instalada envianda OK');
        this.baseinstalada = data;
      });
    
  }

  guardarPotencial(){
    console.log(this.potencialcompra);
    var b = this.potencialcompra;
    this.restProvider.guardarPotencial(b.empresaId,b.lineaId,b.familiaId,b.estadoBasePotencialId,b.cantidad,b.valorunitario,this.imei,b.id)
      .then(data => {
        console.log(data);
        this.potencialcompra = data;
      });
    alert('Potencial Compra enviando OK');
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
    this.imei = this.uid.IMEI;
    return this.uid.IMEI
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