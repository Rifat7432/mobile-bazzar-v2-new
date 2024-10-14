import { BaseQueryApi } from "@reduxjs/toolkit/query";

//error type
export type TErrorData = {
  data: {
    success: boolean;
    massage: string;
    errorMessage: string;
    errorDetails: null;
    stack: null;
  };
};
export type TResponse<T> = {
  data: {
    data?: T;
    success: boolean;
    message: string;
};
error?: TErrorData;
};

export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;

export type TProduct = {
  _id: string;
  img: string;
  date: string;
  purchase: string;
  originalPrice: number;
  resalePrice: number;
  productName: string;
  useYears: string;
  categoryId: string;
  condition: string;
  description: string;
  status: "sold" | "available";
  location: string;
  phoneNumber: string;
  report: boolean;
  sellerId: {
    id: string;
    email: string;
    name: string;
    role: "Seller";
    userImg: string;
    password: string;
    sellerVerified: boolean;
  };
  advertise: boolean;
};

export type TOrder = {
  _id: string;
  productId: string;
  productName: string;
  productPrice: number;
  productImg: string;
  buyerName: string;
  buyerEmail: string;
  meetingLocation: string;
  mobileNumber: string;
  paid: boolean;
  transactionId: string;
};

export type TUser = {
  _id: string;
  id: string;
  email: string;
  name: string;
  role: "Buyer" | "Seller" | "Admin";
  userImg: string;
  password: string;
  sellerVerified: boolean;
};
