import { ApiService } from "src/app/services/api.service";
import { Component, OnInit } from "@angular/core";
import { Type } from "src/app/classes/type_of_food";
import { Calification } from "src/app/classes/calification_restaurants";
import Swal from "sweetalert2";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-register-restaurant',
  templateUrl: './register-restaurant.component.html',
  styleUrls: ['./register-restaurant.component.scss']
})
export class RegisterRestaurantComponent implements OnInit {

  public submitted = false;
  public formGroup: FormGroup;
  public types: Type[] = [];
  public califications: Calification[] = [];

  constructor(
    private apiService: ApiService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
    this.fetchTypes();
    this.fetchCalifications();

    this.formGroup = new FormGroup({
      // TODO: Validar que sean solo números
      nameRestaurant: new FormControl(null, [Validators.required, Validators.minLength(1),  Validators.maxLength(20)]),
      businessName: new FormControl(null, [Validators.required, Validators.minLength(1),  Validators.maxLength(50)]),
      description: new FormControl(null, [Validators.required, Validators.minLength(5),  Validators.maxLength(100)]),
      calification: new FormControl(-1, [Validators.required, Validators.min(0)]),
      capacity: new FormControl(null, [Validators.required, Validators.minLength(1),  Validators.maxLength(20)]),
      price: new FormControl(null, [Validators.required, Validators.minLength(1),  Validators.maxLength(20)]),
      // TODO: Validar el formato que debe tener la contraseña
      image: new FormControl(null, [Validators.required, Validators.min(0)]),
      type: new FormControl(-1, [Validators.required, Validators.min(0)])
    });
  }

  get form() {
    return this.formGroup.controls;
  }

  private fetchTypes(): Type[] {
    this.types = [
      new Type(0, 'Arabe'),
      new Type(1, 'Italiana'),
      new Type(2, 'Indu'),
      new Type(3, 'Japonesa'),
      new Type(4, 'Mexicana'),
      new Type(5, 'Mediterranea'),
      new Type(6, 'Vegana')
    ];
    return this.types;
  }

  private fetchCalifications(): Calification[] {
    this.califications = [
      new Calification(0, 0),
      new Calification(1, 0.5),
      new Calification(2, 1),
      new Calification(3, 1.5),
      new Calification(4, 2),
      new Calification(5, 2.5),
      new Calification(6, 3),
      new Calification(7, 3.5),
      new Calification(8, 4),
      new Calification(9, 4.5),
      new Calification(10, 5)
    ];
    return this.califications;
  }

  public onSubmit() {
    this.submitted = true;

    if (this.formGroup.invalid) {
      return;
    }
  }

}
