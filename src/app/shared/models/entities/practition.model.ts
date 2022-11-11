import {Entity} from '../base/entity';
import {Work} from "./work.model";

export class Practition extends Entity {
  fullName?: string;
  avatar?: string;
  presentation?: string;
  background?: string;
  work?: Work;
}
