
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getproducts_api } from '../../../apis/api';

export const get_all_products = createAsyncThunk(
  'product_data/get_all_products',
  async () => {
    const response = await getproducts_api();
    console.log({ response });
    return response;
  }
);

const product_reducer = createSlice({
  name: 'product_data',
  initialState: {
    products: [],
    loading: false,
    error: null,
    paging_data: {
      total_count: 0,
      current_page: 1
    }
  },
  reducers: {
    change_paging_data: (state, action) => {
      state.paging_data.current_page = action.payload;
    },
    del_product_data_elem: (state, action) => {
      state.products = action.payload;
      state.paging_data.total_count = state.paging_data.total_count - 1;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(get_all_products.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(get_all_products.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload[0]?.data;
        state.paging_data.total_count = action.payload[0]?.totalCount;
      })
      .addCase(get_all_products.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const { change_paging_data, del_product_data_elem } = product_reducer.actions;

export default product_reducer.reducer;
