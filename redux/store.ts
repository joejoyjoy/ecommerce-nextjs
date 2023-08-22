import { configureStore } from "@reduxjs/toolkit";
import authReducer from './features/auth.slice';
import productReducer from './features/product.slice';

export const store = configureStore({
  reducer: {
    authReducer,
    productReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
