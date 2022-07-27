import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isDescMWActive: false,
    description: null,
    name: null,
    link: null
}

export const descriptionMWSLice = createSlice({
    name: 'description',
    initialState,
    reducers: {
        setDescMWActive: (state, action) => {
            state.isDescMWActive = action.payload;
        },
        setDescData: (state, action) => {
            const { description, name, link } = action.payload;
            state.description = description;
            state.name = name;
            state.link = link;
        }
    }
})

export const { setDescMWActive, setDescData } = descriptionMWSLice.actions;
export const descriptionModalState = (state) => state.descriptionModal;