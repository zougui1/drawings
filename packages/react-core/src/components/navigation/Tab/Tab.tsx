import React from 'react';

import { TabProps as BaseTabProps } from '../Tabs/Tab';

export const Tab: React.FC<TabProps> = () => {
  return null;
}

export interface TabProps {
  value: string;
  tab: Omit<BaseTabProps, 'value'>;
  header?: React.ReactChild;
}
