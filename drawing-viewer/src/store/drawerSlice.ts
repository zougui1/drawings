import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DrawerObject, AnimationJSON } from 'drawer';

import { Node } from '../components/TreeCheckItem';
import { updateNode, getCheckedElementsId, makeDebugElementsTree } from '../utils';

export interface DrawerState {
  data: DrawerObject | AnimationJSON | null;
  debugElements: Node | null;
}

const initialState: DrawerState = {
  data: null,
  debugElements: null,
};

export const drawerSlice = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    changeDrawerData: (state, action: PayloadAction<DrawerObject>) => {
      state.data = action.payload;

      const checkedIds = state.debugElements
        ? getCheckedElementsId(state.debugElements)
        : [];
      const drawerElements = makeDebugElementsTree(action.payload.root.children, checkedIds);

      state.debugElements = {
        id: 'debug-elements-root',
        checked: state.debugElements?.checked ?? false,
        label: 'All',
        nodes: drawerElements,
      };
    },
    updateDebugElements: (state, action: PayloadAction<{ id: string; checked: boolean }>) => {
      if (state.debugElements) {
        state.debugElements = updateNode(state.debugElements, action.payload.id, action.payload.checked);
      }
    },
  },
});

export const { changeDrawerData, updateDebugElements } = drawerSlice.actions;

export const drawerReducer = drawerSlice.reducer;
