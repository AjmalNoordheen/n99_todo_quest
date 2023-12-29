import { configureStore } from '@reduxjs/toolkit'
import baseSlice from '../Redux/Slice'
import storage from 'redux-persist/lib/storage';
import {persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage
  }
  const persistedReducer = persistReducer(persistConfig, baseSlice)

export const store = configureStore({
  reducer: {
    user:persistedReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
})

export const persistor = persistStore(store)