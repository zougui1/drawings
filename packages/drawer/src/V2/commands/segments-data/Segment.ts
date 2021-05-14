import { CommandJSON } from '../Command';

export interface Segment {
  absolute: any[];
  original: any[];
  command: string;
  closed: boolean;
  data: CommandJSON;
  pathIndex: number;
  [index: string]: any[] | string | boolean | number | CommandJSON;
}
