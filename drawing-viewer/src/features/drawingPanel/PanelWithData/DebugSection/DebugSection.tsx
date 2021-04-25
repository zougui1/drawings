import React from 'react';
import { FormGroup } from '@material-ui/core';
import { TreeView } from '@material-ui/lab';

import { PanelSection } from '../PanelSection';
import { toogleTooltip } from '../../drawingPanelSlice';
import { Switch } from '../../../../components/Switch';
import { Checkbox } from '../../../../components/Checkbox';
import { TreeCheckItem } from '../../../../components/TreeCheckItem';
import { useAppSelector, useAppDispatch, updateDebugElements } from '../../../../store';

export const DebugSection: React.FC = () => {
  const dispatch = useAppDispatch();

  const displayTooltip = useAppSelector(state => state.drawingPanel.displayTooltip);
  const debugElements = useAppSelector(state => state.drawer.debugElements);

  return (
    <PanelSection title="Debug">
      <FormGroup row>
        <Checkbox
          label="Display tooltip"
          checked={displayTooltip}
          onChange={() => dispatch(toogleTooltip())}
        />
      </FormGroup>

      <span>Dots</span>

      {debugElements && (
        <TreeView>
          <TreeCheckItem
            key={debugElements.id}
            node={debugElements}
            onCheck={({ id, checked }) => dispatch(updateDebugElements({ id, checked: !!checked }))}
          />
        </TreeView>
      )}
    </PanelSection>
  );
}
