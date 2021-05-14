import { useState } from 'react';

import { KeyPressCatcher } from '../utils';
import { BASE_FACTOR, SHIFT_FACTOR, CONTROL_SHIFT_FACTOR } from '../constants';

export const useFactor = (): () => number => {
  const [keyPressCatcher] = useState(new KeyPressCatcher());

  return () => {
    if (keyPressCatcher.arePressed(['Control', 'Shift'])) {
      return CONTROL_SHIFT_FACTOR;
    }

    if (keyPressCatcher.isPressed('Shift')) {
      return SHIFT_FACTOR;
    }

    return BASE_FACTOR;
  }
}
