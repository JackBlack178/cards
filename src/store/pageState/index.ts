import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum Page {
  Home = "Home",
  About = "About",
}

interface PageState {
  page: Page;
}

export const pageSlice = createSlice({
  name: "page",
  initialState: { page: Page.Home },
  reducers: {
    changePage: (state: PageState, action: PayloadAction<Page>) => {
      state.page = action.payload;
    },
  },
});

export const pageActions = pageSlice.actions;
export default pageSlice.reducer;
