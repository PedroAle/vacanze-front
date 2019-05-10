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
        path: 'grupo-tres',
        loadChildren: '../components/grupo-tres/grupo-tres.module#GrupoTresModule'
      },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {}
