import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  books : { items: [] },
  status: "idle",
};

const timer = async () => {
  await new Promise((resolve,reject) => {
    setTimeout(() =>{
      reject('Timeout')
    }, 5000);
  });
};

export const fetchData = createAsyncThunk('search/search', async (url) => {
  const result = await Promise.race([timer(), axios.get(url)]);
  return result === 'Timeout' ? result : result.data;
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
        state.books = action.payload;
      })
      .addCase(fetchData.rejected, (state) => {
        state.status = "rejected";
      });
  }
});

export default searchSlice.reducer;