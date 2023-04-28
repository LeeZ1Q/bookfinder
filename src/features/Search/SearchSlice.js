import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  books : [],
  status: "idle",
};

export const fetchData = createAsyncThunk('search/search', async (url) => {
  const result = await axios.get(url);
  return result.data;
});

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.books = action.payload.items;
      })
      .addCase(fetchData.rejected, (state) => {
        state.status = "rejected";
      });
  }
});

export default searchSlice.reducer;