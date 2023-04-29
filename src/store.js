import { configureStore } from '@reduxjs/toolkit';
import SearchSlice from './features/Search/SearchSlice';
import DarkModeSlice from './features/DarkMode/DarkModeSlice';

const store = configureStore({
  reducer: {
    search: SearchSlice,
    darkmode: DarkModeSlice,
  },
});

export default store;
