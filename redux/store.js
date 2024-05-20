"use client"

import { configureStore} from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import themeReducer from "./theme/themeSlice"


// const rootReducer = combineReducers({
//   user: userReducer,
//   theme:themeReducer
// });

// const persistConfig = {
//   key: "root",
//   storage,
//   version: 1,
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  // reducer: persistedReducer,
  // // below code is preventing default errors
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({ serializableCheck: false }),
  reducer:{
    user: userReducer,
    theme:themeReducer
  }
});

// export const persistor = persistStore(store);