import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { apiSlice } from './features/api/apiSlice';
import userReducer from './features/userSlice';
import subscriptionReducer from './features/subscriptionSlice';
import eventsReducer from './features/eventSlice'
import locationReducer from './features/locationSlice'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const userPersistConfig = {
    key: "auth",
    storage,
    whitelist: ["user", 'token'],
};
const subscriptionPersistConfig = {
    key: "subscription",
    storage,
    whitelist: ["subscription"],
};
const eventsPersistConfig = {
    key: "events",
    storage,
    whitelist: ['searchedEvents', 'initialEvents'],
};

const persistedReducer = persistReducer(userPersistConfig, userReducer);
const persistedSubscriptionReducer = persistReducer(subscriptionPersistConfig, subscriptionReducer);
const persistedEventsReducer = persistReducer(eventsPersistConfig, eventsReducer);

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: persistedReducer,
        events: persistedEventsReducer,
        location: locationReducer,
        subscription: persistedSubscriptionReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }).concat(apiSlice.middleware),
    devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in development mode
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
