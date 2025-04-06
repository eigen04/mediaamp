import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Uses localStorage by default
import favoritesReducer from '../features/favoritesSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['favorites'] // Only persist the favorites slice
};

const rootReducer = combineReducers({
  favorites: favoritesReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types for redux-persist
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
      }
    })
});

export const persistor = persistStore(store);