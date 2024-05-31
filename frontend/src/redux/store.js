import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, PERSIST } from "redux-persist";
import sessionStorage from "redux-persist/lib/storage/session"; // Use sessionStorage instead of localStorage
import Slice from './slice'; // Adjust the path as necessary

const persistConfig = {
    key: 'root',
    storage: sessionStorage,
};

const persistedReducer = persistReducer(persistConfig, Slice);

const store = configureStore({
    reducer: {
        slice1: persistedReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [ PERSIST],
            },
        }),
});

const persistor = persistStore(store);

export { store, persistor };
