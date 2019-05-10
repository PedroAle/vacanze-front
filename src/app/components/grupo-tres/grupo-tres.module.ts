import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgSelectModule } from '@ng-select/ng-select';


import { GrupoTresRoutingModule } from './grupo-tres-routing.module';
import { GrupoTresComponent } from './grupo-tres.component';


@NgModule({
  declarations: [GrupoTresComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    HttpClientModule,
    NgbModule,
    SweetAlert2Module.forRoot(),
    GrupoTresRoutingModule
  ],
  providers: []
})
export class GrupoTresModule { }
