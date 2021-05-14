import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DrawerJSON, AnimatorJSON, Drawer, AnimationElementType } from 'drawer';

export enum HighlightMode {
  standard = 'standard',
  path = 'path',
  none = 'none',
}

export enum DisplayMode {
  standard = 'standard',
  keyframe = 'keyframe',
}

export interface DrawingState {
  debug: {
    showTooltip: boolean;
    elements: string[];
  };
  dom: {
    highlight: {
      standard: {
        left: number;
        top: number;
        width: number;
        height: number;
      } | undefined;
      paths: NodeData[];
      mode: HighlightMode;
    };
    display: {
      mode: DisplayMode;
      expanded: string[];
      keyframeIndex: number;
    };
  };
  drawing: {
    hiddenElements: string[];
  };
  drawingData: DrawerJSON | AnimatorJSON;
}

export const initialState: DrawingState = {
  debug: {
    showTooltip: true,
    elements: [],
  },
  dom: {
    highlight: {
      standard: undefined,
      paths: [],
      mode: HighlightMode.standard,
    },
    display: {
      mode: DisplayMode.standard,
      expanded: [],
      keyframeIndex: 0,
    },
  },
  drawing: {
    hiddenElements: [],
  },
  drawingData: new Drawer('initial').size(1, 1).toJSON(),
};

export const drawingSlice = createSlice({
  name: 'drawing-context',
  initialState,
  reducers: {
    updateDrawingData: (state, action: PayloadAction<DrawerJSON | AnimatorJSON>) => {
      state.drawingData = action.payload;

      if (state.drawingData.type === AnimationElementType.animator) {
        const animationData = state.drawingData;
        const currentKeyframeIndex = state.dom.display.keyframeIndex;
        const keyframeIndex = animationData.keyframes[currentKeyframeIndex] ? currentKeyframeIndex : 0;

        state.dom.display.keyframeIndex = keyframeIndex;
      }

      if (!state.dom.display.expanded.length) {
        state.dom.display.expanded = [
          state.drawingData.slug,
          state.drawingData.root.fullName,
        ];
      }
    },
    toogleTooltip: state => {
      state.debug.showTooltip = !state.debug.showTooltip;
    },
    updateDebugElements: (state, action: PayloadAction<string[]>) => {
      state.debug.elements = action.payload;
    },
    hoverDomElement: (state, action: PayloadAction<{ rect: DOMRect | undefined, nodes: NodeData[] }>) => {
      switch (state.dom.highlight.mode) {
        case HighlightMode.path:
          state.dom.highlight.paths = action.payload.nodes;
          break;
        case HighlightMode.standard:
          if (action.payload.rect) {
            state.dom.highlight.standard = {
              left: action.payload.rect.left,
              top: action.payload.rect.top,
              width: action.payload.rect.width,
              height: action.payload.rect.height,
            };
          }
          break;
      }
    },
    leaveDomElement: (state) => {
      state.dom.highlight.standard = undefined;
      state.dom.highlight.paths = [];
    },
    changeHighlightMode: (state, action: PayloadAction<HighlightMode>) => {
      state.dom.highlight.mode = action.payload;
    },
    changeDisplayMode: (state, action: PayloadAction<DisplayMode>) => {
      state.dom.display.mode = action.payload;
    },
    toggleExpandDomElement: (state, action: PayloadAction<string[]>) => {
      for (const nodeId of action.payload) {
        if (state.dom.display.expanded.includes(nodeId)) {
          state.dom.display.expanded = state.dom.display.expanded.filter(id => id !== nodeId);
        } else {
          state.dom.display.expanded.push(nodeId);
        }
      }
    },
    changeKeyframeIndex: (state, action: PayloadAction<number>) => {
      if (state.drawingData.type === AnimationElementType.animator) {
        const animationData = state.drawingData;
        const keyframeIndex = animationData.keyframes[action.payload - 1] ? action.payload - 1 : 0;

        state.dom.display.keyframeIndex = keyframeIndex;
      }
    },
    hideElements: (state, action: PayloadAction<string[]>) => {
      state.drawing.hiddenElements.push(...action.payload);
    },
    showElements: (state, action: PayloadAction<string[]>) => {
      state.drawing.hiddenElements = state.drawing.hiddenElements.filter(elm => !action.payload.includes(elm));
    },
    hideDebugDots: (state, action: PayloadAction<string[]>) => {
      state.debug.elements = state.debug.elements.filter(elm => !action.payload.includes(elm));
    },
    showDebugDots: (state, action: PayloadAction<string[]>) => {
      state.debug.elements.push(...action.payload);
    },
  },
});

export const {
  updateDrawingData,
  toogleTooltip,
  updateDebugElements,
  hoverDomElement,
  leaveDomElement,
  changeHighlightMode,
  changeDisplayMode,
  toggleExpandDomElement,
  changeKeyframeIndex,
  hideElements,
  showElements,
  hideDebugDots,
  showDebugDots,
} = drawingSlice.actions;

export const drawingReducer = drawingSlice.reducer;

export type NodeData = {
  id: string;
  pathData: string;
  strokeWidth?: number;
}
