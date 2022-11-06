import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import icEdit from '@iconify/icons-ic/twotone-edit';
import icPerson from '@iconify/icons-ic/twotone-person';
import {User} from "../../shared/models/entities/user.model";

@Component({
  selector: 'baarada-users-card',
  templateUrl: './users-card.component.html',
  styleUrls: ['./users-card.component.scss']
})
export class UsersCardComponent implements OnInit {

  @Input() user: User;
  @Output() showUserDialog = new EventEmitter<User>();
  @Output() disableOrEnableUser = new EventEmitter<User>();

  icPerson = icPerson;
  icEdit = icEdit;

  constructor() {
  }

  ngOnInit() {
  }

}
