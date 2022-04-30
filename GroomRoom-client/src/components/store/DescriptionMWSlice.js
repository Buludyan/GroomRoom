import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isDescMWActive: false,
    description: null
}

export const descriptionMWSLice = createSlice({
    name: 'description',
    initialState,
    reducers: {
        setDescMWActive: (state, action) => {
            state.isDescMWActive = action.payload;
        },
        setDescription: (state, action) => {
            state.description = action.payload;
        }
    }
})

export const { setDescMWActive, setDescription } = descriptionMWSLice.actions;
export const descriptionModalState = (state) => state.descriptionModal;