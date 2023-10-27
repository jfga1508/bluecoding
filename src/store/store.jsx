import { configureStore } from '@reduxjs/toolkit';
import { cartReducer } from './cartSlide';
import { clientsReducer } from './clientsSlide';

const store = configureStore({
    reducer: {
        cart: cartReducer,
        clients: clientsReducer,
    },
});

export default store;
