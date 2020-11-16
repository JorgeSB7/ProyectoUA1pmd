import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from '../servicios/autenticacion.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private autService: AutenticacionService,
    private router: Router,
    private activatedRouter: ActivatedRoute) { }

  isAuth() {
    return this.autService.isAuthenticated();
  }

  ngOnInit(): void {
  }

  onLogout(){
    this.autService.logout();
    this.router.navigate(['/iniciosesion'])
  }

}
