import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    bookmarkedGames: []
  },
  reducers: {
    addFavorite: (state, action) => {
      // Prevent duplicates
      if (!state.bookmarkedGames.some(game => game.id === action.payload.id)) {
        state.bookmarkedGames.push(action.payload);
      }
    },
    removeFavorite: (state, action) => {
      state.bookmarkedGames = state.bookmarkedGames.filter(
        game => game.id !== action.payload
      );
    }
  }
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
