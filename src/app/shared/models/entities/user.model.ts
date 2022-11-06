import {Entity} from '../base/entity';

export class User extends Entity {
  username?: string;
  password?: string;
  address?: string;
  active?: boolean = true;
  checked: boolean;
  roles: any;
}
