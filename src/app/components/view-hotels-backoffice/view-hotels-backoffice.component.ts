import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/classes/role';
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';

//tabla responsive reutilizable
import { TableResponsiveComponent  } from "../../blocks/table-responsive/table-responsive.component";

@Component({
  selector: 'app-view-hotels-backoffice',
  templateUrl: './view-hotels-backoffice.component.html',
  styleUrls: ['./view-hotels-backoffice.component.scss']
})
export class ViewHotelsBackofficeComponent implements OnInit {

  private tableHotelsHeader: Array<String>;
  private tableData: Array<Object>;
  private headerTitle: string;

  ngOnInit() {
  }

  constructor() {
    this.headerTitle = "Lista de hoteles";
    this.tableHotelsHeader = this.getTableHeaders();
    this.tableData = this.getExampleData();
  }



  private getExampleData(){
    return [
      {
        "id" : 1,
        "name": "Gran Meliá Caracas",
        "capacity": 5988,
        "phone_number": "+58 (212) 762-8111",
        "web_site": "www.melia.com",
        "status": "Active"
      },
      {
        "id" : 2,
        "name": "Intercontinental Maracaibo",
        "capacity": 5260,
        "phone_number": "+58-0261-7907777",
        "web_site": "www.ihg.com",
        "status": "Active"
      },
      {
        "id" : 3,
        "name": "Eurobuilding",
        "capacity": 1123,
        "phone_number": "+58 (212) 902-1111",
        "web_site": "www.hoteleuro.com",
        "status": "Inactive"
      },
    ];
  }




  //despues se puede crear un servicio
  private getTableHeaders(){
    return [
      "#",
      "Nombre",
      "Cap. de Huéspedes",
      "Teléfono",
      "Sitio Web",
      "Status"
    ];
  }

  public getHotels(){
    return this.tableData;
  }

  public getHeaderHotels(){
    return this.tableHotelsHeader;
  }

  public getHeaderTitle(){
    return this.headerTitle;
  }

}