'use client';

import store from '@/redux/store';
import type { Children } from '@/utils/types/children';
import { Provider } from 'react-redux';

export default function StoreProvider({ children }: Children) {
  return <Provider store={store}>{children}</Provider>;
}
