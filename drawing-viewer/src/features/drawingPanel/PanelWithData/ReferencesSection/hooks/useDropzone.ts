import { useDropzone as useReactDropzone, DropzoneState } from 'react-dropzone';

import { addReferences } from '../../../../previews';
import { useAppDispatch } from '../../../../../store';
import { convertFileToBase64 } from '../../../../../utils';

export const useDropzone = (): DropzoneState => {
  const dispatch = useAppDispatch();

  return useReactDropzone({
    onDrop: async (files: File[]) => {
      const newRefs = await Promise.all(files.map(f => convertFileToBase64(f)));
      dispatch(addReferences(newRefs));
    }
  });
}
