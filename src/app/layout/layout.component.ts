import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  StatusHeader = false;
  StatusSideBar = false;
  StatusLogin = true;
  StatusMain = true;
  collapedSideBar: boolean;
  flagL = 0;
  constructor(private router: Router, private local: LocalStorageService, private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.cdRef.detectChanges();
    this.StatusMain = false;
    this.local.getItem('id').subscribe(id => {
      if (id) {
        this.StatusMain = true;
        this.StatusHeader = true;

        this.local.getItem('rol').subscribe(roles => {
          if (roles.length != 0) {
            if (roles[0].id != 1) {
              this.StatusSideBar = true;
            }
            this.local.getItem('flag').subscribe(flag => {
              if (flag == '1') {
                this.StatusSideBar = false;
              }
            })

            this.local.removeItem('flag');
          }
        })
      } else {

        this.StatusMain = true;
        this.StatusSideBar = false;
        this.StatusHeader = false;
        this.router.navigateByUrl('/grupo-uno')
      }
    })

  }

  ngAfterViewInit() {
    this.cdRef.detectChanges();
  }

  receiveCollapsed($event) {
    this.collapedSideBar = $event;
  }

}
