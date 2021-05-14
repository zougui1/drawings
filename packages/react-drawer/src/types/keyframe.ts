import { PathJSON } from 'drawer';

export interface KeyframePath {
  duration: number;
  from: PathJSON;
  to: PathJSON;
}

export type PathKeyframes = KeyframePath[];
