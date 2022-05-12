import { createSlice, PayloadAction } from "@reduxjs/toolkit";
//import type { RootState } from "./store";

// Define a type for the slice state
interface FavouritesState {
  ids: string[];
}

// Define the initial state using that type
const initialState: FavouritesState = {
  ids: [],
};

const favouritesSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    addFavourite: (state, action: PayloadAction<{ id: string }>) => {
      state.ids.push(action.payload.id);
    },
    removeFavourite: (state, action: PayloadAction<{ id: string }>) => {
      state.ids.splice(state.ids.indexOf(action.payload.id), 1);
    },
  },
});

export const { addFavourite, removeFavourite } = favouritesSlice.actions;

export default favouritesSlice.reducer;
