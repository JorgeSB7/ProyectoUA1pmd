import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'firebase';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
  selector: 'app-inises',
  templateUrl: './inises.component.html',
  styleUrls: ['./inises.component.css']
})
export class InisesComponent implements OnInit {

  loginForm: FormGroup;
  userdata: any;
  mensaje = false;

  constructor(private formBuilder: FormBuilder,
    private autService: AutenticacionService,
    private router: Router,
    private activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required,Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'), Validators.minLength(6)]]
    });
  }

  onSubmit() {
    this.userdata = this.saveUserdata();
    this.inicioSesion(this.userdata);
    setTimeout(() => {
      if (this.isAuth() == false) {
        this.mensaje = true
      }
    }
      , 2000);
  }

  saveUserdata() {
    const saveUserdata = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value,
    };
    return saveUserdata;
  }

  isAuth() {
    return this.autService.isAuthenticated();
  }

  inicioSesion(userdata) {
    firebase.default.auth().signInWithEmailAndPassword(userdata.email, userdata.password).then(response => {
      console.log(response);
      this.router.navigate(['/inicio']);
    }).catch(error => {
      console.log(error);
    })
  }

}