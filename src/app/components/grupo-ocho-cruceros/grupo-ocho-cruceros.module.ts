import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrupoOchoCrucerosRoutingModule } from './grupo-ocho-cruceros-routing.module';
import { GrupoOchoCrucerosComponent } from './grupo-ocho-cruceros.component';
import { TableResponsiveComponent  } from "../../blocks/table-responsive/table-responsive.component";
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ActionAlerterComponent } from '../../blocks/action-alerter/action-alerter.component';
import { HabitacionesComponent } from './habitaciones/habitaciones.component';
import { CrucerosComponent } from './cruceros/cruceros.component';

@NgModule({
  declarations: [
    GrupoOchoCrucerosComponent,
    TableResponsiveComponent,
    ActionAlerterComponent,
    HabitacionesComponent,
    CrucerosComponent
  ],
  imports: [
    CommonModule,
    GrupoOchoCrucerosRoutingModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [],
  exports: [
    TableResponsiveComponent,
    ActionAlerterComponent
  ]
})
export class GrupoOchoCrucerosModule {}
