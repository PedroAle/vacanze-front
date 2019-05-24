import { NgModule } from '@angular/core';
import { Routes, RouterModule, UrlSegment } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      /* Inicio */
      {
        path: '',
        loadChildren: '../components/home/home.module#HomeModule'
      },
      {
        path: 'grupo-uno',
        loadChildren: '../components/grupo-uno/grupo-uno.module#GrupoUnoModule'
      },
      {
        path: 'grupo-trece-habitacion',
        loadChildren: '../components/grupo-trece-habitacion/grupo-trece-habitacion.module#GrupoTreceHabitacionModule'
      },
      {
        path: 'grupo-trece-automovil',
        loadChildren: '../components/grupo-trece-automovil/grupo-trece-automovil.module#GrupoTreceAutomovilModule'
      },
      /* Ruta para Backoffice de Cruceros */
      {
        path: 'cruceros',
        loadChildren: '../components/grupo-ocho-cruceros/grupo-ocho-cruceros.module#GrupoOchoCrucerosModule'
      },
      /* Ruta para Backoffice de Cruceros */
      {
        path: 'register-user',
        loadChildren: '../components/register-user/register-user.module#RegisterUserModule'
      },
      {
        path: 'register-hotel',
        loadChildren: '../components/register-hotel/register-hotel.module#RegisterHotelModule'
      },
      {
        path: 'flight-reservations',
        loadChildren: '../components/grupo-doce-vuelos/flight-reservations/flight-reservations.module#FlightReservationsModule'
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
