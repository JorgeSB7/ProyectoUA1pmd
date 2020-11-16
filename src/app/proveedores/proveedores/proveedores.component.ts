import { Component, OnInit } from '@angular/core';
import { ProveedoresService } from 'src/app/servicios/proveedores.service';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {

  proveedores: any[] = [];
  public cargado: boolean=false;

  constructor(private proveedoresService: ProveedoresService) {
  }

  ngOnInit(): void {
    this.cargado=false;
    try{
    this.proveedoresService.getProveedores()
      .subscribe(proveedores => {
        for (const id$ in proveedores) {
          const p = proveedores[id$];
          p.id$ = id$;
          this.proveedores.push(proveedores[id$]);
        }
      this.cargado=true;
      })
    }catch(error){
      console.log(error);
      this.cargado=true;
    }

  }

  eliminarProveedor(id$) {
    this.proveedoresService.delProveedor(id$)
      .subscribe(res => {
        this.proveedores = [];
        this.proveedoresService.getProveedores()
          .subscribe(presupuestos => {
            for (const id$ in presupuestos) {
              const p = presupuestos[id$];
              p.id$ = id$;
              this.proveedores.push(presupuestos[id$]);
            }
          })
      });
  }

}
