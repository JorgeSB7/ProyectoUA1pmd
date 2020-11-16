import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  constructor(private router: Router,
    private activatedRouter: ActivatedRoute) { }

  registroUsuario(userdata) {
    firebase.default.auth().createUserWithEmailAndPassword(userdata.email, userdata.password).catch(error => {
      console.log(error);
    })
  }

  /* Movido a inises.component.ts
  inicioSesion(userdata) {
    firebase.default.auth().signInWithEmailAndPassword(userdata.email, userdata.password).then(response => {
      console.log(response);
      this.router.navigate(['/inicio']);
    }).catch(error => {
      console.log(error);
    })
  }
  */

  isAuthenticated() {
    const user = firebase.default.auth().currentUser; if (user) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    firebase.default.auth().signOut();
  }
}