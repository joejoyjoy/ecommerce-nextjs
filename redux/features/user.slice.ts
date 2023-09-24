import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserById } from "@/lib/actions/user.actions";

type InitialState = {
  value: FindUserById;
  isLoggedIn: boolean;
  isLoading: boolean;
};

type FindUserById = {
  _id: string;
  name: string;
  image: string;
  isAdmin: boolean;
};

const initialState = {
  value: {
    _id: "",
    name: "",
    image: "",
    isAdmin: false,
  } as FindUserById,
  isLoggedIn: false,
  isLoading: true,
} as InitialState;

export const findUserById = createAsyncThunk(
  "user/findUserById",
  async ({ userId }: { userId: string }) => {
    const response = await getUserById({ userId });
    return response;
  }
);

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(findUserById.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.isLoading = false;
      state.value = action.payload;
    });
  },
});

export default user.reducer;
