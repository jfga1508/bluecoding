// @ts-nocheck
import { configureStore } from '@reduxjs/toolkit';
import { clientsReducer } from './giftSlides,jsx';

const store = configureStore({
    reducer: {
        clients: clientsReducer,
    },
});

export default store;
