import { useDropzone as useReactDropzone, DropzoneState } from 'react-dropzone';

import { convertFileToBase64 } from '../../../utils';

export const useDropzone = (options: DropzoneOptions): DropzoneState => {
  return useReactDropzone({
    onDrop: async (files: File[]) => {
      const newRefs = await Promise.all(files.map(f => convertFileToBase64(f)));
      options.onDrop(newRefs);
    }
  });
}

export interface DropzoneOptions {
  onDrop: (files: string[]) => void;
}
