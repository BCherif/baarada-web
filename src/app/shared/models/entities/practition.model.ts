import {Entity} from '../base/entity';
import {Work} from "./work.model";

export class Practition extends Entity {
  fullName?: string;
  avatar?: string;
  phoneNumber?: string;
  presentation?: string;
  background?: string;
  work?: Work;
  user?: any;
}
