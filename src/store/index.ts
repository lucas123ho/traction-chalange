import { configureStore } from '@reduxjs/toolkit';

import companyReducer from './slices/company';
import unitReducer from './slices/unit';
import userReducer from './slices/users';

const store = configureStore({
  reducer: {
    user: userReducer,
    unit: unitReducer,
    company: companyReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
