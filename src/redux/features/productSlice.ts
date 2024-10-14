import { PayloadAction, createSlice } from "@reduxjs/toolkit";


type TValue = {
  value: [];
  all: [];
  querys: {
    lowPrice?: number;
    hightPrice?: number;
    model?: string;
    brand?: string;
    releaseDate?: string;
    type?: string;
    size?: string;
    color?: string;
    material?: string;
    suspensionType?: string;
    customAttributes?: string;
    searchTerm?: string;
  };
};
const initialState: TValue = {
  value: [],
  all: [],
  querys: { lowPrice: 100, hightPrice: 1000 },
};
// product slice
export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    storProductsData: (state, actions: PayloadAction<[]>) => {
      state.value = actions.payload;
    },
    storProductsAllData: (state, actions: PayloadAction<[]>) => {
      state.all = actions.payload;
    },
    setQuery: (state, actions) => {
      state.querys = actions.payload;
    },
  },
});
export const { storProductsData, storProductsAllData, setQuery } =
  productSlice.actions;
export default productSlice.reducer;
