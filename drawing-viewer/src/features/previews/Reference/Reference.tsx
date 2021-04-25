import React from 'react';
import { IconButton } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import { StandaloneInteractable } from '../../../components/StandaloneInteractable';

export const Reference = ({ reference, id, onDelete }: ReferenceProps) => {
  return (
    <>
      <StandaloneInteractable id={id}>
        <img src={reference} alt="reference viewer" />
      </StandaloneInteractable>

      <IconButton className="reference-delete-button" onClick={onDelete}>
        <DeleteForeverIcon />
      </IconButton>
    </>
  );
}

interface ReferenceProps {
  reference: string;
  id?: string;
  onDelete: () => void;
}
