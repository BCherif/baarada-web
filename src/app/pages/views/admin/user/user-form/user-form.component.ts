import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import icEdit from '@iconify/icons-ic/twotone-edit';
import icAdd from '@iconify/icons-ic/twotone-add';
import icCheck from '@iconify/icons-ic/twotone-check';
import icClose from '@iconify/icons-ic/twotone-close';
import icLock from '@iconify/icons-ic/twotone-lock';
import icVisibility from '@iconify/icons-ic/twotone-visibility';
import icVisibilityOff from '@iconify/icons-ic/twotone-visibility-off';
import icPerson from '@iconify/icons-ic/twotone-person';
import icMapMarker from '@iconify/icons-fa-solid/map-marker-alt';
import {ToastrService} from "ngx-toastr";
import {MatCheckboxChange} from "@angular/material/checkbox";
import {User} from "../../../../../shared/models/entities/user.model";
import {Role} from "../../../../../shared/models/entities/role.model";
import {UserService} from "../../../../../shared/services/user.service";
import {RoleService} from "../../../../../shared/services/role.service";

@Component({
  selector: 'baarada-user-form',
  templateUrl: 'user-form.component.html',
  styleUrls: ['user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  icAdd = icAdd;
  icEdit = icEdit;
  icCheck = icCheck;
  icClose = icClose;

  icPerson = icPerson;
  icMapMarker = icMapMarker;
  icLock = icLock;

  icVisibility = icVisibility;
  icVisibilityOff = icVisibilityOff;

  inputType = 'password';
  visible = false;

  userFormGroup: FormGroup;
  user: User;
  roles: Role[] = [];
  selectedRoles: Role[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public _data: any,
              private _dialogRef: MatDialogRef<UserFormComponent>,
              private _fb: FormBuilder,
              private _cd: ChangeDetectorRef,
              private _userService: UserService,
              private _roleService: RoleService,
              private _toast: ToastrService) {

    if (this._data) {
      this.user = this._data.user;
    }
  }

  ngOnInit() {
    this.createUserForm();
    this._roleService.findAll().subscribe(ret => {
      if (ret.ok) {
        this.roles = ret.data;
        this.addRoleCheckboxes();
      }
    });
  }

  createUserForm() {
    this.userFormGroup = this._fb.group({
      id: [this.user?.id],
      username: [this.user?.username, [Validators.required]],
      password: this.user?.password,
      address: [this.user?.address],
      active: [this.user?.active],
      checked: [this.user?.checked],
      roles: new FormArray([])
    });

    this.addRoleCheckboxes();
  }

  save() {
    let newUser = this.userFormGroup.value;
    newUser.roles = this.selectedRoles;

    this._userService.create(newUser).subscribe(ret => {
      if (ret.ok) {
        this._dialogRef.close(ret.data);
        this._toast.success(ret.message);
      } else {
        this._toast.error(ret.message);
      }
    }, error => {
      this._toast.error("Une erreur est survenue");
    })
  }

  changeState() {
    this.userFormGroup.patchValue({active: !this.userFormGroup.get('active').value});
  }

  toggleVisibility() {
    if (this.visible) {
      this.inputType = 'password';
      this.visible = false;
      this._cd.markForCheck();
    } else {
      this.inputType = 'text';
      this.visible = true;
      this._cd.markForCheck();
    }
  }


  selectAllRoles(event: MatCheckboxChange) {
    this.selectedRoles = [];
    this.roles.forEach((item, i) => {
      if (event.checked) {
        item.checked = event.checked;
        this.checkRoleItem(i);
      } else {
        item.checked = event.checked;
      }
    });
  }

  checkRoleItem(index: number) {
    let roleSelected = this.roles[index];
    const rowIndex = this.selectedRoles.indexOf(roleSelected);
    if (rowIndex >= 0) {
      this.selectedRoles.splice(rowIndex, 1);
    } else {
      this.selectedRoles.push(roleSelected);
    }
  }

  addRoleCheckboxes() {
    let names = [];

    this.user?.roles?.forEach(role => {
      names.push(role.name);
    });

    this.roles.forEach((item, i) => {
      if (names.includes(item.name)) {
        item.checked = true;
        this.checkRoleItem(i);
      }
      const control = new FormControl(item); // if first item set to true, else false
      (this.userFormGroup.controls.roles as FormArray).push(control);
    });
  }
}
