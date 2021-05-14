import React from 'react';
import clsx from 'clsx';
import {
  Tabs as MuiTabs,
  TabsProps as MuiTabsProps,
} from '@material-ui/core';

import { useStyles } from './Tabs.styles';
import { Tab as BaseTab } from './Tab';
import { TabPanel } from './TabPanel';
import { Tab, TabProps } from '../Tab';

const tabType = (<Tab value="" tab={{ label: '' }} />).type;

export const Tabs: React.FC<TabsProps> = ({ children, value, className, ...props }) => {
  const classes = useStyles();

  const childs = Array.isArray(children) ? children : [children];
  const tabs = childs.filter(child => {
    if (!child) {
      return;
    }

    if (!React.isValidElement(child) || child.type !== tabType) {
      console.warn(`<Tabs /> children should all be <Tab /> elements. Got "${child}" of type "${typeof child}".`);
      return;
    }

    return true;
  }) as React.ReactElement<React.PropsWithChildren<TabProps>>[];

  return (
    <>
      <MuiTabs
        {...props}
        className={clsx(classes.tabs, className)}
        value={value}
      >
        {tabs.map(({ props }) => (
          <BaseTab key={props.value} {...props.tab} value={props.value} />
        ))}
      </MuiTabs>

      {tabs.map(({ props }) => (
        <TabPanel
          key={props.value}
          value={props.value}
          panel={value}
          header={props.header}
        >
          {props.children}
        </TabPanel>
      ))}
    </>
  )
}

export interface TabsProps extends Omit<MuiTabsProps, 'onChange'> {
  onChange: (event: React.ChangeEvent<{}>, value: any) => void;
}
