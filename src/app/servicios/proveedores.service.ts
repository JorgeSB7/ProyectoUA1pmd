import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {


  provURL = 'https://crompasapp.firebaseio.com/proveedores.json';
  proURL = 'https://crompasapp.firebaseio.com/proveedores';


  constructor(private http: HttpClient) {}
  postProveedor(proveedores: any){
    const newprov = JSON.stringify(proveedores);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(this.provURL, newprov, {headers})
    .pipe(map(res => {
      console.log(res);
      return(res);
    }))
  }

  getProveedores(){
    return this.http.get(this.provURL)
    .pipe(map(res => res));
  }

  getProveedor(id$: string){
    const url = `${this.proURL}/${id$}.json`;
    return this.http.get(url)
      .pipe(map(res => res));

  }

  putProveedor(proveedor: any, id$: string){
    const newprov = JSON.stringify(proveedor);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const url = `${this.proURL}/${id$}.json`;
    return this.http.put(url, newprov, {headers})
    .pipe(map(res => {
      console.log(res);
      return res;
    }))
  }

  delProveedor(id$ : string){
    const url = `${ this.proURL }/${ id$ }.json`;
    return this.http.delete(url)
    .pipe(map(res => res));
  }

}