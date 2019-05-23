import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/classes/role';
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-restaurantes',
  templateUrl: './restaurantes.component.html',
  styleUrls: ['./restaurantes.component.scss']
})
export class RestaurantesComponent implements OnInit {

  private tableRestaurantesHeader: Array<String>;
  private tableData: Array<Object>;
  private headerTitle: string;

  // configuraciones de los sweetalert
  private deleteAlertConfiguration: SweetAlertOptions;

  // la accion que le llega de actionalerter para ejecutar sobre un registro
  public actionAlert: string;

  ngOnInit() {
  }

  constructor() {
    this.headerTitle = "Lista de Restaurantes";
    this.tableRestaurantesHeader = this.getTableHeaders();
    this.tableData = this.getExampleData();
    this.deleteAlertConfiguration =  {
      title: 'Desea eliminar el hotel?',
      confirmButtonText: 'Si, estoy seguro',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      type: 'question',
      focusCancel: true
    };
  }

  public getAlertAction(action: string) {
    this.actionAlert = action;
    console.log(this.actionAlert);
  }


  private getExampleData() {
    return [
      {
        "id" : 1,
        "name": "Mc Donalds",
        "capacity": 5988,
        "status": "Active"
      },
      {
        "id" : 2,
        "name": "Wendys",
        "capacity": 5260,
        "status": "Active"
      },
      {
        "id" : 3,
        "name": "Burger King",
        "capacity": 1123,
        "status": "Inactive"
      },
    ];
  }

  private getTableHeaders() {
    return [
      "#",
      "Nombre",
      "Cap. de Huéspedes",
      "Status"
    ];
  }

  public getHotels() {
    return this.tableData;
  }

  public getHeaderHotels() {
    return this.tableRestaurantesHeader;
  }

  public getHeaderTitle() {
    return this.headerTitle;
  }

  public getDeleteAlertConfiguration() {
    return this.deleteAlertConfiguration;
  }


}
