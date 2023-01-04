import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {UserFormComponent} from './user-form/user-form.component';
import icEdit from '@iconify/icons-ic/twotone-edit';
import icRefresh from '@iconify/icons-ic/twotone-refresh';
import icUsers from '@iconify/icons-ic/twotone-people';
import icClose from '@iconify/icons-ic/twotone-close';
import icCheck from '@iconify/icons-ic/twotone-check';
import icSearch from '@iconify/icons-ic/twotone-search';
import icAdd from '@iconify/icons-ic/twotone-add';
import icMoreHoriz from '@iconify/icons-ic/twotone-more-horiz';
import {fadeInUp400ms} from '../../../../../@vex/animations/fade-in-up.animation';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions} from '@angular/material/form-field';
import {stagger40ms} from '../../../../../@vex/animations/stagger.animation';
import {FormControl} from '@angular/forms';
import {UntilDestroy} from '@ngneat/until-destroy';
import {ToastrService} from "ngx-toastr";
import {scaleIn400ms} from "../../../../../@vex/animations/scale-in.animation";
import {fadeInRight400ms} from "../../../../../@vex/animations/fade-in-right.animation";
import {scaleFadeIn400ms} from "../../../../../@vex/animations/scale-fade-in.animation";
import {User} from "../../../../shared/models/entities/user.model";
import {UserService} from "../../../../shared/services/user.service";
import {ConfirmDialogComponent} from "../../../../dialogs/confirm-dialog/confirm-dialog.component";


@UntilDestroy()
@Component({
  selector: 'baarada-user-grid',
  templateUrl: 'user-grid.component.html',
  styleUrls: ['user-grid.component.scss'],
  animations: [
    scaleIn400ms,
    fadeInRight400ms,
    stagger40ms,
    fadeInUp400ms,
    scaleFadeIn400ms
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'standard'
      } as MatFormFieldDefaultOptions
    }
  ]
})
export class UserGridComponent implements OnInit {

  /**
   * Simulating a service with HTTP that returns Observables
   * You probably want to remove this and do all requests in a service with HTTP
   */
  searchFromCtrl = new FormControl();
  icUsers = icUsers;
  icClose = icClose;
  icCheck = icCheck;
  icEdit = icEdit;
  icRefresh = icRefresh;
  icSearch = icSearch;
  icAdd = icAdd;
  icMoreHoriz = icMoreHoriz;

  page = 0;
  size = 10;
  totalElements: number;

  users: User[];


  constructor(private _matDialog: MatDialog,
              private _userService: UserService,
              private _toast: ToastrService) {
  }


  ngOnInit() {
    this.findAllByPage(this.page, this.size);
  }

  findAllByPage(page: number, size: number) {
    this._userService.findByPage(page, size).subscribe((value) => {
      if (value.ok) {
        this.users = value.data.items;
        this.totalElements = value.data.totalElements;
      }
    });
  }


  showFormDialog(user?: User, rowIndex?: number) {
    let matDialogRef: MatDialogRef<UserFormComponent> = this._matDialog.open(UserFormComponent, {
      disableClose: true,
      data: {
        user: user
      }
    });
    matDialogRef.afterClosed().subscribe(newUser => {
      if (newUser) {
        if (user && user.id) { // update
          // const index = this.users.findIndex((existingUser) => existingUser.id === newUser.id);
          this.users[rowIndex] = newUser;
          this.users[this.users.findIndex((existingUser) => existingUser.id === newUser.id)] = newUser;

        } else { // new
          this.users.unshift(newUser);
        }
      }
    });
  }


  disableOrEnable(user: User, rowIndex?: number): void {

    this._matDialog.open(ConfirmDialogComponent, {
      disableClose: true,
      data: {
        confirmMessage: 'Etes-vous vraiment sure ' + (user.active ? 'de desactiver' : 'd\'activer') + ' cet utilisateur ?'
      }
    }).afterClosed().subscribe(result => {
      if (result) {
        this._userService.disableOrEnable(user).subscribe(ret => {
          if (ret['status'] == 'OK') {
            user.active = !user.active;
            this.users[rowIndex] = user;
            this.users[this.users.findIndex((existingUser) => existingUser.id === user.id)] = user;
            this._toast.success(ret['message']);
          } else {
            this._toast.error(ret['message']);
          }
        }, e => {
          this._toast.error("Une erreur est survenue");
        });
      }
    });
  }


}
