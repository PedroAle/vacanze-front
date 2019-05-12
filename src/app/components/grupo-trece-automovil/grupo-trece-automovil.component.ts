import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-grupo-trece-automovil',
  templateUrl: './grupo-trece-automovil.component.html',
  styleUrls: ['./grupo-trece-automovil.component.scss']
})
export class GrupoTreceAutomovilComponent implements OnInit {

  closeResult: string;
  constructor(private modalService: NgbModal) { }

  openLg(content) {
      this.modalService.open(content, { size: 'lg' }).result.then((result) => {
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
          return  `with: ${reason}`;
      }
  }

  ngOnInit() {
  }

  deleteFile(){
      console.log("Registro eliminado")
  }

}
