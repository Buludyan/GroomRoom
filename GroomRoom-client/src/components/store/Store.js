import { configureStore } from "@reduxjs/toolkit";
import { columnsSlice } from "./ColumnsSlice";
import { addEditMWSlice } from "./AddEditMWSlice";
import { authSlice } from "./AuthSlice";
import { deleteMWSlice } from "./DeleteMWSlice";
import { descriptionMWSLice } from "./DescriptionMWSlice";

export const store = configureStore({
    reducer: {
        columns: columnsSlice.reducer,
        addEditmodal: addEditMWSlice.reducer,
        deleteModal: deleteMWSlice.reducer,
        descriptionModal: descriptionMWSLice.reducer,
        authentication: authSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});