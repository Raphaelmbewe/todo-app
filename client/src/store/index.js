import { configureStore } from '@reduxjs/toolkit';

import combinedReducer from '@/store/reducers';

const store = configureStore({
  reducer: combinedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

export default store;
