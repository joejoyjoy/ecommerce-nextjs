import { allProducts, publishProduct } from "@/lib/actions/product.actions";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type InitialState = {
  value: ProductState[] | null;
};

type ProductState = {
  _id: string;
  SKU: string;
  name: string;
  desc: string;
  price: number;
  image: ImageObject;
  gender: number;
  rating: number;
  likes: number;
  category: string;
  color: string;
  createdAt: any;
  updatedAt: any;
  __v: number;
};

type ImageObject = {
  public_id: string;
  secure_url: string;
};

const initialState: InitialState = {
  value: [
    {
      _id: "",
      SKU: "",
      name: "",
      desc: "",
      price: 0,
      image: {
        public_id: "",
        secure_url: "",
      },
      gender: 0,
      rating: 0,
      likes: 0,
      category: "",
      color: "",
      createdAt: 0,
      updatedAt: 0,
      __v: 0,
    },
  ],
};

interface Props {
  name: string;
  desc: string;
  price: number;
  image: any;
  gender: number;
  category: string;
  color: string;
}

export const uploadProduct = createAsyncThunk(
  "product/uploadProduct",
  async ({ userId, data }: { userId: string; data: Props }) => {
    const response = await publishProduct(userId, data);
    return response;
  }
);

export const findAllProducts = createAsyncThunk(
  "product/findAllProducts",
  async () => {
    const response = await allProducts();
    return response;
  }
);

export const product = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(uploadProduct.fulfilled, (state, action) => {
      if (state.value != null) {
        if (state.value.length < 2) {
          state.value = action.payload;
        }
        state.value = {
          ...state.value,
          ...action.payload,
        };
      }
    });
    builder.addCase(findAllProducts.fulfilled, (state, action) => {
      if (state.value != null) {
        state.value = action.payload;
      }
    });
  },
});

// export const { noAuthFound } = product.actions;
export default product.reducer;
