import { createSlice } from '@reduxjs/toolkit';

const clientsSlide = createSlice({
    name: 'clients',
    initialState: {
        items: [
            {
                name: '',
            },
        ],
    },
    reducers: {
        addItem: (state, action) => {
            state.items = [...state.items, action.payload];
        },
        removeItem: (state, action) => {
            state.items = state.items.filter((obj) => {
                return obj.name !== action.payload.name;
            });
        },
    },
});

export const { reducer: clientsReducer, actions: clientsAction } = clientsSlide;

export default clientsSlide.reducer;
