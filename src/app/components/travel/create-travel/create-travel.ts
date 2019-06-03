import { Component, Output, EventEmitter } from '@angular/core';
import { NgbModal, NgbDate, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import Swal from 'sweetalert2';
import { LocalStorageService } from '../../../services/local-storage.service';

@Component({
  selector: 'create-travel',
  templateUrl: './create-travel.html',
  styleUrls: ['./create-travel.scss'],
  providers: [NgbModal]
})

export class CreateTravelComponent {

  @Output() spread = new EventEmitter();
  private userId: string;
  activeModal: NgbModalRef;
  public formGroup: FormGroup;
  travelForm: FormGroup;
  hoveredDate: NgbDate;
  fromDate: NgbDate;
  toDate: NgbDate;


  constructor(private modalService: NgbModal, private apiService: ApiService, private localStorage: LocalStorageService) {
    this.localStorage.getItem("id").subscribe(data => {
      if (data) {
        this.userId = data
        this.travelForm = new FormGroup({
          name: new FormControl('', Validators.required),
          description: new FormControl(''),
          userId: new FormControl(this.userId, Validators.required),
          init: new FormControl('', Validators.required),
          end: new FormControl('', Validators.required)
        });
      }
    }) 
  }

  open(content) {    
    this.activeModal = this.modalService.open(content);
       
  }

  closeModal() {
    this.activeModal.close();
  }

  createTravel() {
    this.apiService.postUrl('travels', this.travelForm.value).then(
      (resp) => {
        this.closeModal();
        Swal.fire({
          title: '!Éxito¡',
          text: 'El viaje se creo satisfactoriamente.',
          type: 'success'
        });
        this.spread.emit();
      },
      (fail) => {
        Swal.fire({
          title: 'Error: ' + fail.status,
          text: fail.name + '. ' + fail.statusText,
          type: 'error',
        })
      }
    );
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
      this.travelForm.controls['init'].setValue(this.fromDate.year + '-' + this.fromDate.month + '-' + this.fromDate.day);
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
      this.travelForm.controls['end'].setValue(this.toDate.year + '-' + this.toDate.month + '-' + this.toDate.day);
    } else {
      this.toDate = null;
      this.fromDate = date;
      this.travelForm.controls['end'].setValue('');
      this.travelForm.controls['init'].setValue(this.fromDate.year + '-' + this.fromDate.month + '-' + this.fromDate.day);
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }
}