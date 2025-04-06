import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Replace with your RAWG API key
const API_KEY = '5c6d7973715c4594ac3e60b947ea7bbc';
const BASE_URL = 'https://api.rawg.io/api';

export const fetchGames = createAsyncThunk(
  'games/fetchGames',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { filters } = getState();
      
      // Build query string based on filters
      let queryString = `${BASE_URL}/games?key=${API_KEY}`;
      
      if (filters.categories.length > 0) {
        queryString += `&genres=${filters.categories.join(',')}`;
      }
      
      if (filters.tags.length > 0) {
        queryString += `&tags=${filters.tags.join(',')}`;
      }
      
      if (filters.search) {
        queryString += `&search=${filters.search}`;
      }
      
      if (filters.yearRange) {
        const [startYear, endYear] = filters.yearRange;
        queryString += `&dates=${startYear}-01-01,${endYear}-12-31`;
      }
      
      if (filters.rating > 0) {
        queryString += `&metacritic=${Math.round(filters.rating * 20)}`;
      }
      
      const response = await fetch(queryString);
      
      if (!response.ok) {
        throw new Error('Failed to fetch games');
      }
      
      const data = await response.json();
      return data.results;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const gamesSlice = createSlice({
  name: 'games',
  initialState: {
    games: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGames.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGames.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.games = action.payload;
      })
      .addCase(fetchGames.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default gamesSlice.reducer;
