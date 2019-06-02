import { Component, OnInit,EventEmitter,Output } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { compararFechas } from '../../utils/global_functions';
import * as moment from 'moment';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { Timestamp } from 'rxjs';

@Component({
    selector: 'mis-reservas',
    templateUrl: './mis-reservas.html',
   // styleUrls: ['./mis-reservas.scss'],
    providers: [ApiService]
})
export class MisReservas implements OnInit {
    myForm: FormGroup;
    public carreservations ="";
    public roomreservations="";
    public closeResult: string;
    public id: number = null;
    public totalcost : number = null;
    public roomreservation = [];
    public carreservation = [];

    @Output() public actionAlertEventEmitter = new EventEmitter();

    constructor(public fb: FormBuilder, private modalService: NgbModal, private apiService: ApiService) {
        this.myForm = this.fb.group({
          fechaOne: ['', [Validators.required]],
            fechaTwo: ['', [Validators.required]]
        });
    }

    ngOnInit() {
    
    this.getAutomobileReservations();
     this.getRoomReservations();
    }

     /**************************************************************************
  * Metodo para enviar la confirmación de la alerta                         *
  **************************************************************************/
  public messageAlert(event: Object){
    this.actionAlertEventEmitter.emit(event);
  }

      /************************************************************************
  * Metodo para lanzar la alerta de confirmacion , de eliminacion o estatus*
  **************************************************************************/
  public openModalActions(event, data: Object, type: string, deleted? : boolean){
    event.preventDefault();
    let config: SweetAlertOptions = {
      title: '¿' + (deleted ? 'Desea eliminar la reservacion de ':'Desea cambiar el status del ') + type + '?',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      type: 'question',
      focusCancel: true
    }
    Swal.fire(config).then(result => {
      data['delete'] = deleted;
      if(result && ('value' in result)){
        data['confirmed'] = true;
      }
      else {
        data['confirmed'] = false;
      }
      this.messageAlert(data);
    })
  }

    /**********************************************************************
    * Metodo que es llamado por el boton editar                           *
    ***********************************************************************/
   public goToEdit(type: string){

  }

  /**********************************************************************
    * Metodo que es llamado para mostrar las reservas de ese usuario                          *
    ***********************************************************************/
  getAutomobileReservations(){
    console.log("Estoy en getAutomobileReservations");
    var user_id = localStorage.getItem('id');
    const requestURL = "reservationautomobiles/?user="+user_id;
    this.apiService.getUrl(requestURL).then(
        response => {
          console.log(response);
            this.carreservations = response;
        },
        error => {
            console.log(error);
        }
    );
}

getRoomReservations(){
  console.log("Estoy en getRoomReservations");
  var user_id = localStorage.getItem('id');
  const requestURL = "reservationrooms/?user="+user_id;
  this.apiService.getUrl(requestURL).then(
      response => {
        console.log(response);
          this.roomreservations = response;
      },
      error => {
          console.log(error);
      }
  );
}

public deleteAutomobileReservation(id: number) {
  const requestURL = `reservationautomobiles/${id}`;
  this.apiService.deleteUrl(requestURL).then(
    response => {
      console.log(response);
      this.getAutomobileReservations();
      console.log('Reservacion con el id=' + id + 'fue eliminada');
    }, error => {
      console.error(error);
      this.getAutomobileReservations();
    }
  );
}

public deleteRoomReservation(id: number) {
  const requestURL = `reservationrooms/${id}`;
  this.apiService.deleteUrl(requestURL).then(
    response => {
      console.log(response);
      this.getRoomReservations()
      console.log('Reservacion con el id=' + id + 'fue eliminada');
    }, error => {
      console.error(error);
      this.getRoomReservations();
    }
  );
}

getRoomReservation(id: number) {
  console.log('ID: ' + id);
  const requestURL = `reservationrooms/${id}`;
  this.apiService.getUrl(requestURL).then(
    response => {
      this.id = response.id;
      this.roomreservation = response;
    },
    error => {
      console.log(error);
    }
  );
}

getCarReservation(id: number) {
  console.log('ID: ' + id);
  const requestURL = `reservationautomobiles/${id}`;
  this.apiService.getUrl(requestURL).then(
    response => {
      this.id = response.id;
      this.carreservation = response;
    },
    error => {
      console.log(error);
    }
  );
}

getDaysFrom2Dates(date1:any, date2:any,price:number){
  //var prueba1 =new Date("01/05/2019");
 // var prueba2 =new Date("01/02/2019");
 var parseDate1 = new Date(date1);
 var parseDate2 = new Date(date2);
 console.log(parseDate1);
 console.log(date2);
  this.totalcost = (parseDate2.getDate() - parseDate1.getDate());
  console.log("dayDif"+this.totalcost);
  this.totalcost = Math.round(this.totalcost);
  console.log("dayDifference "+ this.totalcost);
  this.totalcost = price * this.totalcost;
  console.log(this.totalcost);
 // return this.totalcost;
}

openRoom(content, id: number) {
 this.getRoomReservation(id);

  this.modalService.open(content, { size: 'lg', centered: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}

openCar(content, id: number) {
  this.getCarReservation(id);

   this.modalService.open(content, { size: 'lg', centered: true }).result.then((result) => {
       this.closeResult = `Closed with: ${result}`;
   }, (reason) => {
       this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
   });
 }

private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
  } else {
      return `with: ${reason}`;
  }
}


}