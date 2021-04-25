import {
  MoveObject,
  LineObject,
  CurveObject,
  ArcObject,
  CloseObject,
  RectObject,
  CircleObject,
} from '../commands';

export type TypedCommandObject = MoveObject | LineObject | CurveObject | ArcObject | CloseObject | RectObject | CircleObject;
