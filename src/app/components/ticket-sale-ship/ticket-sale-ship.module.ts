import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {TicketSaleShipComponent} from './ticket-sale-ship.component';
import {TicketSaleShipRoutingModule} from './ticket-sale-ship-routing.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
//import { ApiService } from 'src/app/services/api.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TicketSaleShipComponent],
  imports: [
    TicketSaleShipRoutingModule,
    CommonModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    SweetAlert2Module.forRoot(),
    ReactiveFormsModule
  ],
 // providers: [ApiService],
  
})
export class TicketSaleShipModule { }