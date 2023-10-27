import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [
            {
                name: 'Apple',
            },
        ],
    },
    reducers: {
        addItem: (state, action) => {
            state.items = [...state.items, action.payload];
        },
        removeItem: (state, action) => {
            state.items = state.items.filter(function (obj) {
                return obj.name !== action.payload;
            });
        },
    },
});

// Action creators are generated for each case reducer function
export const { reducer: cartReducer, actions: cartActions } = cartSlice;

export default cartSlice.reducer;
