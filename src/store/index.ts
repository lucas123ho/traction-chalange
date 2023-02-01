import { configureStore } from '@reduxjs/toolkit';

import assetReducer from './slices/asset';
import companyReducer from './slices/company';
import unitReducer from './slices/unit';
import userReducer from './slices/user';
import workorderReducer from './slices/workorder';

const store = configureStore({
  reducer: {
    user: userReducer,
    unit: unitReducer,
    company: companyReducer,
    asset: assetReducer,
    woekorder: workorderReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
