import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/productSlice";
import authReducer from "../features/authSlice";
import historyReducer from "../features/saleHistory";
import { baseApi } from "../services/API";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from "redux-persist";
  import storage from "redux-persist/lib/storage";
  
  const persistConfig = {
    key: "auth",
    storage,
  };
  const persistedAuthReducer = persistReducer(persistConfig, authReducer);
// global storage
export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    product: productReducer,
    history: historyReducer,
    auth: persistedAuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);