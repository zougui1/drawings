import { checkGroupDrawsEverything, checkDataFormat, checkKeyframeShape } from './animationChecks';
import { Drawer, DrawerObject, Group, GroupObject, Path } from '../elements';
import { Previews } from '../Previews';
import { ObjectLiteral, FlatDrawingData } from '../types';
import { flattenDrawingData } from '../utils';

export class Animator {

  static readonly type: 'animation' = 'animation';

  protected _name: string;
  protected readonly _data: ObjectLiteral;
  protected readonly _flatData: FlatDrawingData[] = [];
  protected _drawer: Drawer;
  protected _duration: number | undefined;
  protected _drawingModel: Record<string, ('stroke' | 'fill')[]> = {};
  protected _keyframes: { time: number, drawer: Group }[] = [];

  constructor(name: string, data: ObjectLiteral) {
    this._name = name;
    this._data = data;
    this._flatData = flattenDrawingData(data);

    checkDataFormat(this._flatData);

    this._drawer = new Drawer(data, name);
  }

  //#region public API
  size(width: number, height: number): this {
    this._drawer.setSize(width, height);
    return this;
  }

  addKeyFrames(keyFrames: Record<string, (drawer: Group) => void>): this {
    for (const [keyTime, drawer] of Object.entries(keyFrames)) {
      if (isNaN(+keyTime)) {
        throw new Error(`The keytime must be a number. Got "${keyTime}".`);
      }

      if (typeof drawer !== 'function') {
        throw new Error(`The drawer of a keyframe must be a function. Got "${drawer}".`);
      }
    }

    const keyTimes = Object.keys(keyFrames).map(kt => +kt).sort();

    if (!keyTimes.length) {
      throw new Error('The animation requires at least 1 frame.');
    }

    const firstKeyTime = keyTimes[0];

    if (firstKeyTime !== 0) {
      throw new Error('The animation must start at "0".');
    }

    const duration = keyTimes[keyTimes.length - 1];
    this._duration = duration;

    keyTimes.forEach((keyTime, i) => {
      const firstDrawer = this._keyframes[0]?.drawer;
      const prevDrawer = this._keyframes[i - 1]?.drawer;
      const drawer = new Group(this._data);

      keyFrames[keyTime](drawer);

      if (firstDrawer) {
        checkKeyframeShape(firstDrawer, drawer);
      }

      if (prevDrawer) {
        mergeElements(prevDrawer, drawer);
      }

      this._keyframes.push({
        time: keyTime,
        drawer,
      });
    });

    checkGroupDrawsEverything(this._keyframes[0].drawer, this._flatData);
    const map: Record<string, { time: number, path: Path }[]> = {};

    for (const { time, drawer } of this._keyframes) {
      const paths = drawer.getPaths();

      for (const path of paths) {
        const name = `${path.getNamespace()} > ${path.getName()}`;

        map[name] ??= [];
        map[name].push({
          time,
          path
        });
      }
    }

    const durationStr = `${duration}s`;

    for (const paths of Object.values(map)) {
      generateAnimation(this._name, paths[0], duration, durationStr, paths);
    }

    return this;
  }
  //#endregion

  get previews(): Previews {
    return this._drawer.previews;
  }

  get root(): Group {
    return this._drawer.root;
  }

  //#region parsing
  toObject(): AnimatorJSON {
    const drawerJson = this._drawer.toObject();

    return {
      ...drawerJson,
      type: Animator.type,
      duration: this._duration ?? 0,
      root: {
        ...drawerJson.root,
        children: this._keyframes[0].drawer.toObject().children,
      },
      keyframes: this._keyframes.map(kf => ({
        time: kf.time,
        path: kf.drawer.toObject(),
      })),
    };
  }
  //#endregion
}

export interface AnimatorJSON extends Omit<DrawerObject, 'type'> {
  type: typeof Animator.type;
  duration: number;
  keyframes: { time: number, path: GroupObject }[];
}

const mergeElements = (prevGroup: Group, nextGroup: Group) => {
  for (const prevElement of prevGroup.elements) {
    const prevName = prevElement.getName();
    const nextElement = nextGroup.elementsMap[prevName];

    if (!nextElement) {
      nextGroup.addElement(prevElement);
    } else if (prevElement instanceof Group && nextElement instanceof Group) {
      mergeElements(prevElement, nextElement);
    }
  }
}

const getNames = (group: Group): any[] => {
  return group.elements.map(element => {
    const names = [element.buildName()];

    if (element instanceof Group) {
      return names.concat(getNames(element));
    }

    return names;
  });
}

const generateAnimation = (name: string, frame: { time: number, path: Path }, durationNum: number, duration: string, motionPaths: { time: number, path: Path }[]) => {
  const animation = frame.path.animatePath(name).duration(duration);

  motionPaths.forEach((path, i) => {
    animation.addFrame((path.time / durationNum) * 100, path.path.pathData.toString());
  });
}
