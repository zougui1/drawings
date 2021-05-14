import moment from 'moment';

import { useAppDispatch, changeDrawerData } from '../../store';
import { useSocket } from '../../hooks';

export const useUpdateSvg = () => {
  const dispatch = useAppDispatch();

  useSocket('update-svg', (data: any) => {
    const date = moment();
    const dateString = date.format('HH:mm:ss');
    console.group(`[${dateString}]`, 'update-svg');

    console.time('parse')
    const parsedData = JSON.parse(data);
    console.timeEnd('parse')

    if (parsedData.type === 'error') {
      console.error('An error occurred when trying to update the svg.');
      console.error(parsedData.stack);
      return;
    }

    console.groupEnd();

    dispatch(changeDrawerData(parsedData));
  });
}
