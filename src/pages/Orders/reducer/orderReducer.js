
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { get_orders_api } from '../../../apis/api';

export const get_all_orders = createAsyncThunk(
  'order_data/get_all_orders',
  async (data) => {
    const response = await get_orders_api(data);
    // console.log({ response });
    return response;
  }
);

const order_reducer = createSlice({
  name: 'order_data',
  initialState: {
    orders: [],
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
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(get_all_orders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(get_all_orders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
      })
      .addCase(get_all_orders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const { change_paging_data } = order_reducer.actions;

export default order_reducer.reducer;
