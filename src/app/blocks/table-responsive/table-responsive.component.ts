import { Component, Input, Output, OnChanges, EventEmitter, OnInit} from '@angular/core';
import { ActionAlerterComponent } from '../action-alerter/action-alerter.component';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-responsive',
  templateUrl: './table-responsive.component.html',
  styleUrls: ['./table-responsive.component.scss']
})

export class TableResponsiveComponent implements OnChanges{

    @Input() headerTitle: string; // Nombre de la tabla ej: Listado de registros
    @Input() tableData: Array<Object>; // Array con la data a mostrar en cada fila de la tabla
    @Input() tableHeaders: Array<String>; // Array con los nombres de cada columna en la tabla
    @Input() type: string;

    //para la configuracion de la alerta
    //esta configuracion no se puede cambiar y debe ser individual
    @Input() deleteAlertConfiguration: SweetAlertOptions = {};

    //generico de la interaccion con el alert
    @Output() public actionAlertEventEmitter = new EventEmitter();
    @Output() public emitRouting = new EventEmitter();

    constructor(private router: Router) { // Agregando tooltip en boton de agregar
    }

    ngOnChanges() {
      if (this.tableData.length !== 0) {
        this.tableData.forEach(b => {
          if(b['status'] === 'Active') {
            b['active'] = true;
          }
          else {
            b['active'] = false;
          }
        });
      }
    }

    public messageAlert(event: Object){
      this.actionAlertEventEmitter.emit(event);
    }

    public openModalActions(action, data: Object, type: string, deleted? : boolean){
      action.preventDefault();
      let config: SweetAlertOptions = {
        title: '',
        confirmButtonText: 'Si, estoy seguro',
        cancelButtonText: 'Cancelar',
        showCancelButton: true,
        type: 'question',
        focusCancel: true  
      }

      if(deleted){
        config.title = 'Desea eliminar el ' + type + '?';
      }
      else {
        if(data && type === 'crucero'){
          data['status'] === 'Active' ? config.title = 'Desea desactivar el crucero?' : config.title = 'Desea activar el crucero?';
        }
        else if(data && type === 'hotel'){
          //Aqui haces tu logica Cesar
        }
      }
     
      Swal.fire(config).then(result => {
        this.messageAlert(data);
      })
    }

    /*******************************************************************
    * Metodo para redireccionar a la vista de habitaciones del crucero *
    ********************************************************************/ 
    public goToBoatRooms(){
      this.emitRouting.emit('/habitaciones');
    }
}
