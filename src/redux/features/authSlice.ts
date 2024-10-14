import {  createSlice } from "@reduxjs/toolkit";




type TInitialState = {
  user: {
    _id?: string;
    id?:string;
    email: string;
    name: string;
    role: "Buyer" | "Seller" | "Admin";
    userImg: string;
    sellerVerified: boolean;
  } | null;
  token: string | null;
  verify: boolean;
  loading: boolean;
};
const initialState: TInitialState = {
  user: null,
  token: null,
  verify: false,
  loading: false,
};
// authentication slice
export const authSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    storUserData: (state, actions) => {
      state.user = actions.payload;
    },
    storToken: (state, actions) => {
      state.token = actions.payload;
    },
    setLoading: (state, actions) => {
      state.loading = actions.payload;
    },
    isVerify: (state, actions) => {
      state.verify = actions.payload;
    },
  },
});
export const {
  storToken,
  storUserData,
  setLoading,
  isVerify,

} = authSlice.actions;
export default authSlice.reducer;
