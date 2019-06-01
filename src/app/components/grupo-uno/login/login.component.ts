import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { Router, RouterOutlet } from '@angular/router';
import { LayoutComponent } from '../../../layout/layout.component';
import { GrupoUnoComponent } from '../grupo-uno.component';






@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ApiService]
})


export class LoginComponent implements OnInit {

  @ViewChild(RouterOutlet) outlet: RouterOutlet;
  @ViewChild('Recovery') Recovery: ElementRef;
  isPushed = true;
  isShow = false;
  isShowLogin = true;
  isShowPmodal = false;
  TodoForm: FormGroup;
  StatusLogin = true;
  formModel = {
    Email: '',
    Password: ''
  }
  constructor(private service: ApiService, private father: LayoutComponent, private router: Router, private landing: GrupoUnoComponent) {


  }

  ngOnInit() {

  }
  onSubmit(form: NgForm) {
    this.isPushed = false;
    this.isShow = true;
    this.isShowLogin = false;
    this.service.postUrl('Login/Login', form.value).then(
      (res: any) => {
        localStorage.setItem('id', res.id);
        localStorage.setItem('rol', res.roles[0].name);
        localStorage.setItem('Email', res.email);
        if (res.roles[0].name == 1) {
          this.StatusLogin = false;
          this.father.StatusHeader = true;
          this.isPushed = true;
          this.isShow = false;
          this.isShowLogin = true;
          this.router.navigateByUrl('/landing');
        } else if (res.roles[0].name != 1) {
          this.father.StatusHeader = true;
          this.father.StatusSideBar = true;
          this.StatusLogin = false;
          this.isPushed = true;
          this.isShow = false;
          this.isShowLogin = true;
          this.router.navigateByUrl('/landing');
        }
      }, error => {
        if (error.status == 400 || error.status != 200)
          alert("Ha ocurrido un error")
        this.isPushed = true;
        this.isShow = false;
        this.isShowLogin = true;
      }
    );
  }
  RecoverySubmit(recoveryForm: NgForm) {
    this.isShowPmodal = true
    this.service.postUrl('Email/Email', recoveryForm.value).then(
      (res: any) => {
        localStorage.setItem('Email', res.email);
        if (res.email) {
          this.StatusLogin = false;
          this.father.StatusHeader = true;
          this.father.StatusMain = false;
          alert("Se le ha enviado un correo con exito")
          this.isShowPmodal = false;
          this.router.navigateByUrl('/home');
        }
      },
      error => {
        if (error.status == 400 || error.status != 200) {
          alert("Ha ocurrido un error")
          this.isShowPmodal = false;
        } else if (error.status == 200)
          alert("Envio de nueva contraseña a su correo")
        this.isShowPmodal = false;
      }
    );
  }
}
