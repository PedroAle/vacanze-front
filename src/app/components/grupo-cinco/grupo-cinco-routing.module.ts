import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrandComponent} from './brand/brand.component';
import { ModelComponent } from './model/model.component';
import { FleetComponent } from './fleet/fleet.component';

const routes: Routes = [
  { path: 'brand', component: BrandComponent },
  { path: 'model', component: ModelComponent },
  { path: 'fleet', component: FleetComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GrupoCincoRoutingModule {}
