import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { checkUser } from "@/lib/actions/user.actions";
import formatToISOString from "@/utils/formatToISOString";

type InitialState = {
  value: AuthState;
};

type AuthState = {
  _id: string;
  name: string;
  email: string;
  image: string;
  isAdmin: boolean;
  productToCart: [];
  productLiked: [];
  productCreated: [];
  createdAt: string;
  updatedAt: string;
  timesSignedIn: number;
};

const initialState = {
  value: {
    _id: "",
    name: "",
    email: "",
    image: "",
    isAdmin: false,
    productToCart: [],
    productLiked: [],
    productCreated: [],
    createdAt: "",
    updatedAt: "",
    timesSignedIn: 0,
  } as AuthState,
} as InitialState;

export const logInAsync = createAsyncThunk(
  "auth/logInAsync",
  async ({ name, email, image }: any) => {
    const response = await checkUser({
      name,
      email,
      image,
    });
    return response;
  }
);

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(logInAsync.fulfilled, (state, action) => {
      action.payload.updatedAt = formatToISOString(action.payload.updatedAt);
      action.payload.createdAt = formatToISOString(action.payload.createdAt);
      state.value = action.payload;
    });
  },
});

export default auth.reducer;
