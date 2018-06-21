import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

  //apiUrl = 'http://localhost:40506/api/';
  apiUrl = 'http://admin.conexait.com/api/';
  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }

  solicitarAlmuerzo(imei) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + 'EmpresasApi/Almuerzo?Imei=' + imei).subscribe(data => {
        resolve(data);
      }, err => {
        alert('Ya se utilizó esta opción hoy o el sistema no esta disponible')
      });
    });
  }

  buscarEmpresas(nombre) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + 'EmpresasApi/BuscarEmpresas?nombre=' + nombre).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }  

  buscarEmpresasGPS(latitud, longitud) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + 'EmpresasApi/BuscarEmpresasGeo?latitude=' + latitud+'&Longitude='+longitud).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  actualizarEmpresasGPS(id, latitud, longitud) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + 'EmpresasApi/ActualizarEmpresasGeo?id='+id+'&latitud='+latitud+'&longitud='+longitud).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  guardarVisita(empresaid ,motivo, tipo, imei) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + 'EmpresasApi/GuardarVisita?EmpresaId=' + empresaid+'&Tipo='+tipo+'&Motivo='+motivo+'&Imei='+imei).subscribe(data => {
        resolve(data);
      }, err => {
        alert('Error guardando la visita');
      });
    });
  }

  buscarLineas() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + 'EmpresasApi/GetLineas').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  buscarFamilias(lineaid) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + 'EmpresasApi/GetFamilias?LineaId=' + lineaid).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  buscarBase(empresaid,lineaid,familiaid) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + 'EmpresasApi/TraerBaseInstalada?EmpresaId='+empresaid+'&LineaId=' + lineaid+'&FamiliaId='+familiaid).subscribe((data:any) => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  buscarPotencial(empresaid,lineaid,familiaid) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + 'EmpresasApi/TraerPotencialCompra?EmpresaId='+empresaid+'&LineaId=' + lineaid+'&FamiliaId='+familiaid).subscribe((data:any) => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  guardarBase(empresaid,lineaid,familiaid,estadoid,cantidad,valor,imei,id) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + 'EmpresasApi/BaseInstalada?EmpresaId='+empresaid+'&LineaId=' + lineaid+'&FamiliaId='+familiaid+'&EstadoId='+estadoid+'&Cantidad='+cantidad+'&Valor='+valor+'&Imei='+imei+'&baseinsid='+id).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  guardarPotencial(empresaid,lineaid,familiaid,estadoid,cantidad,valor,imei,id) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + 'EmpresasApi/PotencialCompra?EmpresaId='+empresaid+'&LineaId=' + lineaid+'&FamiliaId='+familiaid+'&EstadoId='+estadoid+'&Cantidad='+cantidad+'&Valor='+valor+'&Imei='+imei+'&baseinsid='+id).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }


}
