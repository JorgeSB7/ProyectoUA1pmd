import { Component, OnInit } from '@angular/core';
import { PresupuestosService } from '../../servicios/presupuestos.service';

@Component({
  selector: 'app-presupuestos',
  templateUrl: './presupuestos.component.html',
  styleUrls: ['./presupuestos.component.css']
})
export class PresupuestosComponent implements OnInit {

  presupuestos: any[] = [];
  public cargado: boolean=false;

  constructor(private presupuestosService: PresupuestosService) {
    
  }

  eliminarPresupuesto(id$) {
    this.presupuestosService.delPresupuesto(id$)
      .subscribe(res => {
        this.presupuestos = [];
        this.presupuestosService.getPresupuestos()
          .subscribe(presupuestos => {
            for (const id$ in presupuestos) {
              const p = presupuestos[id$];
              p.id$ = id$;
              this.presupuestos.push(presupuestos[id$]);
            }
          })
      });
  }

  ngOnInit(): void {
    this.cargado=false;
    try{
    this.presupuestosService.getPresupuestos()
      .subscribe(presupuestos => {
        for (const id$ in presupuestos) {
          const p = presupuestos[id$];
          p.id$ = id$;
          this.presupuestos.push(presupuestos[id$]);
        }
      this.cargado=true;
      })
    }catch(error){
      console.log(error);
      this.cargado=true;
    }
  }

  }
