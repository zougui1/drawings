// @ts-nocheck
import { Path, Group } from './elements';
import { PathData } from './PathData';
import { DrawingData } from './DrawingData';
import { EndingPath } from './types';
import { getNth } from './utils';

export class Parts<T extends DrawingData> {

  baseName: string = '';
  baseZIndex!: EndingPath<T['zIndexes'], number>;
  baseStroke!: EndingPath<T['colors'], string>;
  baseFill!: EndingPath<T['colors'], string>;
  baseStrokeWidth: number = 1;
  parts: Part<T>[] = [];
  currentFrame: number = 0;
  currentKeyTime: number | undefined;

  constructor(baseName: string) {
    this.baseName = baseName;
  }

  //#region edit part
  stroke(baseStroke: EndingPath<T['colors'], string>): this {
    this.baseStroke = baseStroke;
    return this;
  }

  fill(baseFill: EndingPath<T['colors'], string>): this {
    this.baseFill = baseFill;
    return this;
  }

  strokeWidth(baseStrokeWidth: number): this {
    this.baseStrokeWidth = baseStrokeWidth;
    return this;
  }

  keyTime(keyTime: number): this {
    this.currentKeyTime = keyTime;
    return this;
  }

  zIndex(baseZIndex: EndingPath<T['zIndexes'], number>): this {
    this.baseZIndex = baseZIndex;
    return this;
  }

  addPart(partNumber: number, drawer: (frameBuilder: PathData, path: Path<T>) => void): this {
    if (partNumber < 1) {
      throw new Error(`The first part starts at 1. Got "${partNumber}"`);
    }

    if (this.currentKeyTime === undefined) {
      throw new Error(`A key time is required before adding a part frame.`);
    }

    const partIndex = partNumber - 1;

    if (!this.parts[partIndex]) {
      const name = `${getNth(partNumber)} ${this.baseName}`;
      const newPart = new Part(name)
        .fill(this.baseFill)
        .stroke(this.baseStroke)
        .strokeWidth(this.baseStrokeWidth)
        .zIndex(this.baseZIndex);

      this.parts[partIndex] = newPart;
    }


    this.parts[partIndex].addFrame(this.currentFrame, this.currentKeyTime, drawer);
    this.currentKeyTime = undefined

    return this;
  }

  frame(frameIndex: number): this {
    if (frameIndex < 1) {
      throw new Error(`The first frame starts at 1. Got "${frameIndex}"`);
    }

    this.currentFrame = frameIndex;
    return this;
  }
  //#endregion

  //#region action
  draw(group: Group<T>): this {
    for (const part of this.parts) {
      if (!part.frames[0]) {
        throw new Error(`Can't draw without the first frame.`);
      }

      const path = group
        .path(part._name)
        .zIndex(part._zIndex)
        .stroke(part._stroke)
        .fill(part._fill)
        .strokeWidth(part._strokeWidth);

      part.frames[0].drawer(path.pathData, path);
    }
    return this;
  }

  animate(name: string, group: Group<T>, options: IAnimateOptions = {}): this {
    for (const part of this.parts) {
      if (!part.frames.length) {
        console.warn(new Error('The animation has no frames.'));
      }



      const path = group
        .path(part._name)
        .zIndex(part._zIndex)
        .stroke(part._stroke)
        .fill(part._fill)
        .strokeWidth(part._strokeWidth);

      const animation = path
        .animatePath(name)
        .duration(options.duration);

      for (const frame of part.frames) {
        animation.addPath(frame.keyTime, pathData => {
          frame.drawer(pathData, path);
        });
      }
    }

    return this;
  }
  //#endregion
}

export interface IAnimateOptions {
  duration?: string;
}

export class Part<T extends DrawingData> {

  _name: string = '';
  _zIndex!: EndingPath<T['zIndexes'], number>;
  _stroke!: EndingPath<T['colors'], string>;
  _fill!: EndingPath<T['colors'], string>;
  _strokeWidth: number = 1;
  frames: PartFrame<T>[] = [];

  constructor(name: string) {
    this._name = name;
  }

  //#region edit part
  stroke(stroke: EndingPath<T['colors'], string>): this {
    this._stroke = stroke;
    return this;
  }

  fill(fill: EndingPath<T['colors'], string>): this {
    this._fill = fill;
    return this;
  }

  strokeWidth(strokeWidth: number): this {
    this._strokeWidth = strokeWidth;
    return this;
  }

  zIndex(zIndex: EndingPath<T['zIndexes'], number>): this {
    this._zIndex = zIndex;
    return this;
  }

  addFrame(frameIndex: number, keyTime: number, drawer: (frameBuilder: PathData, path: Path<T>) => void): this {
    if (frameIndex < 1) {
      throw new Error(`The first frame starts at 1. Got "${frameIndex}"`);
    }

    const newFrame = new PartFrame(keyTime, drawer);
    this.frames[frameIndex - 1] = newFrame;
    return this;
  }
  //#endregion
}

export class PartFrame<T extends DrawingData> {
  keyTime: number = 0;
  drawer: (frameBuilder: PathData, path: Path<T>) => void;

  constructor(keyTime: number, drawer: (frameBuilder: PathData, path: Path<T>) => void) {
    this.keyTime = keyTime;
    this.drawer = drawer;
  }
}
