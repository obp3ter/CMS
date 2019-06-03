import {Chair} from "@app/shared/models/chair.model";
import {Author} from "@app/shared/models/author.model";
import {Listener} from "@app/shared/models/listener.model";

export class Session{
  id : number;
  chair : Chair;
  speaker : Author;
  listeners : Array<Listener>;
  paperFileName : string;
  date : string;
  time : string;

}
