import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isDescMWActive: false,
    description: null,
    name: null
}

export const descriptionMWSLice = createSlice({
    name: 'description',
    initialState,
    reducers: {
        setDescMWActive: (state, action) => {
            state.isDescMWActive = action.payload;
        },
        setDescData: (state, action) => {
            const { description, name } = action.payload;
            state.description = description;
            state.name = name;
        }
    }
})

export const { setDescMWActive, setDescData } = descriptionMWSLice.actions;
export const descriptionModalState = (state) => state.descriptionModal;