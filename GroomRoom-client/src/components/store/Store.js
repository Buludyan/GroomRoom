import { configureStore } from "@reduxjs/toolkit";
import { columnsSlice } from "./ColumnsSlice";
import { AddEditMWSlice } from "./AddEditMWSlice";

export const store = configureStore({
    reducer: {
        columns: columnsSlice.reducer,
        addEditmodal: AddEditMWSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})