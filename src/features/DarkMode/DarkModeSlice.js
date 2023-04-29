import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	mode: "light",
};

const DarkModeSlice = createSlice({
	name: "darkmode",
	initialState,
	reducers: {
		toggleMode(state) {
			state.mode = state.mode === "light" ? "dark" : "light";
		},
	},
});

export default DarkModeSlice.reducer;
export const { toggleMode } = DarkModeSlice.actions;
