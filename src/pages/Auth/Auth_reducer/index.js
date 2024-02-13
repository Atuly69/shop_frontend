import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const auth_reducer = createSlice({
    name: 'user_data',
    initialState: {
        user_data: {
            name: 'Atul'
        }
    },
    reducers: {
        insert_user_data: (state, action) => {
            state.user_data = {
                ...state.user_data,
                ...action.payload
            }
        },
        remove_user_data: (state, action) => {
            state.user_data = {};
        }
    }
});
export const { insert_user_data, remove_user_data } = auth_reducer.actions;

export default auth_reducer.reducer;
