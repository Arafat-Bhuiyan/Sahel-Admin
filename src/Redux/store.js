import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./services/authSlice";
import { api } from "./api/api";

const rootReducer = combineReducers({
  auth: authReducer,
  [api.reducerPath]: api.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: [
          "meta.baseQueryMeta.request",
          "meta.baseQueryMeta.response",
          "meta.arg.originalArgs",
        ],
      },
    }).concat(api.middleware),
});
