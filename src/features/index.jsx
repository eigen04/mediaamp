import { configureStore } from '@reduxjs/toolkit';
import gamesReducer from './gamesSlice';
import filtersReducer from './filtersSlice';
import bookmarksReducer from './bookmarksSlice';

export const store = configureStore({
  reducer: {
    games: gamesReducer,
    filters: filtersReducer,
    bookmarks: bookmarksReducer,
  },
});