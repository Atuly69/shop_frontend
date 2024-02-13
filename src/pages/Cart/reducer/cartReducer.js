
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { get_cart_api } from '../../../apis/api';

export const get_all_carts = createAsyncThunk(
  'cart_data/get_all_carts',
  async (data) => {
    const response = await get_cart_api(data);
    // console.log({ response });
    return response;
  }
);

const cart_reducer = createSlice({
  name: 'cart_data',
  initialState: {
    carts: [],
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
    upd_carts: (state, action) => {
      state.carts = action.payload;
    },
    erase_cart_data: (state, action) => {
      state.carts = [];
      state.paging_data = {
        total_count: 0,
        current_page: 1
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(get_all_carts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(get_all_carts.fulfilled, (state, action) => {
        state.loading = false;
        state.carts = action.payload.cart.map((el) => {
          return {
            ...el,
            items: el.items.map((li) => {
              return {
                ...li,
                parent_id: el._id,
                change_flag: false
              }
            })
          }
        });
      })
      .addCase(get_all_carts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const { change_paging_data, erase_cart_data, upd_carts } = cart_reducer.actions;

export default cart_reducer.reducer;
