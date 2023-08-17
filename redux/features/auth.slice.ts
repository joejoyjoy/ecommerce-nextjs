import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { checkUser } from "@/lib/actions/user.actions";

type InitialState = {
  value: AuthState;
  isLoggedIn: boolean;
  isLoading: boolean;
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
  isLoggedIn: false,
  isLoading: true,
} as InitialState;

export const authState = createAsyncThunk(
  "auth/authState",
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
  reducers: {
    noAuthFound: () => {
      return {
        ...initialState,
        isLoading: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authState.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.isLoading = false;
      state.value = action.payload;
    });
  },
});

export const { noAuthFound } = auth.actions;
export default auth.reducer;
