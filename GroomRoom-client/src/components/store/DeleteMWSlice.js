import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isActive: false,
    isAllDelete: false,
    column: null,
    item: null,
};

export const deleteMWSlice = createSlice({
    name: 'delete',
    initialState,
    reducers: {
        setActive: (state, action) => {
            const { isActive, isAllDelete } = action.payload;
            state.isActive = isActive;
            state.isAllDelete = isAllDelete;
        },
        setData: (state, action) => {
            const { column, item } = action.payload;
            state.column = column;
            state.item = item;
        }
    }
});

export const { setActive, setData } = deleteMWSlice.actions;
export const deleteModalState = (state) => state.deleteModal;