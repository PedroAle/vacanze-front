import { NgModule } from '@angular/core';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { GrupoCincoRoutingModule } from './grupo-cinco-routing.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrandComponent } from './brand/brand.component';
import { ModelComponent } from './model/model.component';
import { FleetComponent } from './fleet/fleet.component';
import { CreateBrandComponent } from './brand/create-brand/create-brand';
import { ModifyBrandComponent } from './brand/modify-brand/modify-brand';

@NgModule({
  declarations: [
    BrandComponent,
    ModelComponent,
    FleetComponent,
    CreateBrandComponent,
    ModifyBrandComponent
  ],
  imports: [
    CommonModule,
    GrupoCincoRoutingModule,
    HttpClientModule,
    FormsModule,
    SweetAlert2Module.forRoot(),
    ReactiveFormsModule,
    NgbModalModule
  ],
  providers: []
})
export class GrupoCincoModule { }
