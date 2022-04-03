import { configureStore } from "@reduxjs/toolkit";
import { columnsSlice } from "./ColumnsSlice";
import { addEditMWSlice } from "./AddEditMWSlice";
import { authSlice } from "./AuthSlice";

export const store = configureStore({
    reducer: {
        columns: columnsSlice.reducer,
        addEditmodal: addEditMWSlice.reducer,
        authentication: authSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})