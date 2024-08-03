import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
export interface IProduct {
  id: number;
  price: number;
  title: string;
  image: string;
  description: string;
  category: string;
  count: number;
}
interface IProductSlice {
  data: IProduct[];
  status: 'idle' | 'fulfilled' | 'pending' | 'rejected';
}

const Product: IProductSlice = {
  data: [],
  status: 'idle',
};

export const fetchProduct = createAsyncThunk('async', async () => {
  const res = await axios.get('https://fakestoreapi.com/products');
  return res.data;
});
export const SliceProd = createSlice({
  name: 'Assign',
  initialState: Product,
  reducers: {
    delProduct: (state, action) => {
      if (action.payload == 'logout') {
        (state.data = []), (state.status = 'idle');
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = 'fulfilled';
      })
      .addCase(fetchProduct.pending, (state, action) => {
        state.status = 'pending';
      });
  },
});
export const { delProduct } = SliceProd.actions;
export const productReducer = SliceProd.reducer;
