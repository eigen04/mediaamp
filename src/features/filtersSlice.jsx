import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    categories: [],
    tags: [],
    search: '',
    yearRange: [2000, 2023],
    rating: 0,
  },
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setTags: (state, action) => {
      state.tags = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setYearRange: (state, action) => {
      state.yearRange = action.payload;
    },
    setRating: (state, action) => {
      state.rating = action.payload;
    },
    resetFilters: (state) => {
      state.categories = [];
      state.tags = [];
      state.search = '';
      state.yearRange = [2000, 2023];
      state.rating = 0;
    },
  },
});

export const {
  setCategories,
  setTags,
  setSearch,
  setYearRange,
  setRating,
  resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;