import {configureStore} from "@reduxjs/toolkit";

import productsReducer from "./products";
import userReducer from "./user";

const store = configureStore({
  reducer: {
    products: productsReducer,
    user: userReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
