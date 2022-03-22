import { configureStore } from "@reduxjs/toolkit";
import { columnsSlice } from "./ColumnsSlice";
import { modalWindowSlice } from "./ModalWindowSlice";

export const store = configureStore({
    reducer: {
        columns: columnsSlice.reducer,
        modal: modalWindowSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})