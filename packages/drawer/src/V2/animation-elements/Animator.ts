import { checkGroupDrawsEverything, checkKeyframeShape } from './animationChecks';
import { AnimationElementType } from './AnimationElementType';
import { Drawer, DrawerJSON, Group, GroupJSON, Path } from '../drawing-elements';
import { FlatDrawingData } from '../types';
import { flattenDrawingData } from '../utils';
import { Previews } from '../Previews';
import { parseKeyframesObject } from '../utils';

export class Animator {

  public readonly elementType: AnimationElementType.animator = AnimationElementType.animator;

  protected _name: string;
  protected readonly _data: FlatDrawingData[];
  protected _drawer: Drawer;
  protected _duration: number | undefined;
  //protected _drawingModel: Record<string, ('stroke' | 'fill')[]> = {};
  protected _keyframes: { time: number, group: Group }[] = [];

  constructor(name: string, data: Record<string, any>) {
    this._name = name;
    this._data = flattenDrawingData(data);
    this._drawer = new Drawer(name);
  }

  //#region public API
  size(width: number, height: number): this {
    this._drawer.size(width, height);
    return this;
  }

  get previews(): Previews {
    return this._drawer.previews;
  }

  get root(): Group {
    return this._drawer.root;
  }
  //#endregion

  //#region parsing
  keyframes(keyframes: Record<number, (drawer: Group) => void>): this {
    const _keyframes = parseKeyframesObject(keyframes, {
      min: 1,
      valueType: 'function',
    });

    const duration = _keyframes[_keyframes.length - 1].time || 1;
    this._duration = duration;

    _keyframes.forEach((keyframe, i) => {
      const firstGroup = this._keyframes[0]?.group;
      const prevGroup = this._keyframes[i - 1]?.group;
      const group = new Group();

      keyframe.value(group);

      if (firstGroup) {
        checkKeyframeShape(firstGroup, group, { time: keyframe.time, nth: i + 1 });
      } else {
        checkGroupDrawsEverything(group, this._data);
      }

      if (prevGroup) {
        for (const path of group.getPaths()) {
          firstGroup.getPath(path)?.animateOnKeyframe(i);
        }

        mergeGroups(prevGroup, group);
      }

      this._keyframes.push({
        time: keyframe.time,
        group,
      });
    });

    const keyframesPaths: Record<string, { time: number, path: Path }[]> = {};

    for (const { time, group } of this._keyframes) {
      const paths = group.getPaths();

      for (const path of paths) {
        const name = path.buildNeutralName();

        keyframesPaths[name] ??= [];
        keyframesPaths[name].push({
          time,
          path
        });
      }
    }

    for (const paths of Object.values(keyframesPaths)) {
      generateAnimation( paths[0].path, duration, paths);
    }

    return this;
  }
  //#endregion

  //#region parsing
  toJSON(): AnimatorJSON {
    const drawerJson = this._drawer.toJSON();

    return {
      ...drawerJson,
      type: AnimationElementType.animator,
      duration: this._duration ?? 0,
      root: {
        ...drawerJson.root,
        paths: this._keyframes[0].group.toJSON().paths,
      },
      keyframes: this._keyframes.map(kf => ({
        time: kf.time,
        path: kf.group.toJSON(),
      })),
    };
  }
  //#endregion
}

export interface AnimatorJSON extends Omit<DrawerJSON, 'type'> {
  type: AnimationElementType.animator;
  duration: number;
  keyframes: { time: number, path: GroupJSON }[];
}

const mergeGroups = (originGroup: Group, currentGroup: Group) => {
  for (const path of originGroup.getPaths()) {
    if (!currentGroup.hasPath(path.buildNeutralName())) {
      currentGroup.addPath(path);
    }
  }
}

const generateAnimation = (path: Path, duration: number, keyframes: { time: number, path: Path }[]): void => {
  const animation = path.animatePath('main-animation').duration(duration);
  const _keyframes = keyframes.reduce((acc, kf) => {
    acc[kf.time / duration] = kf.path.pathData.toString();
    return acc;
  }, {} as Record<number, string>);

  animation.keyframes(_keyframes);
}
