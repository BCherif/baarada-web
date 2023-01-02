import {Entity} from '../base/entity';
import {Practition} from "./practition.model";
import {Customer} from "./customer.model";
import {Role} from "./role.model";

export class User extends Entity {
  username?: string;
  password?: string;
  address?: string;
  active?: boolean = true;
  checked: boolean;
  practitioner: Practition;
  customer: Customer;
  roles: Role[];
}
