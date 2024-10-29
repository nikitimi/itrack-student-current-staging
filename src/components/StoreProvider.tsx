'use client';

import type { Children } from '@/utils/types/children';

import React from 'react';
import { Provider } from 'react-redux';

import store from '@/redux/store';

const StoreProvider = ({ children }: Children) => {
  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
