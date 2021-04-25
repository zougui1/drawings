import { PathObject } from 'drawer';

export interface KeyframePath {
  duration: number;
  from: PathObject;
  to: PathObject;
}

export type PathKeyframes = KeyframePath[];
