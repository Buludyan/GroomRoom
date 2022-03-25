import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isActive: false,
    source: '',
    name: '',
    description: '',
    id: null,
    columnName: ''
}

export const modalWindowSlice = createSlice({
    name: 'modal window',
    initialState,
    reducers: {
        setIsActiveAdd: (state, action) => {
            state.isActive = !state.isActive;
            state.source = 'Add';
            state.name = '';
            state.description = '';
        },
        setIsActiveEdit: (state, action) => {
            const {name, description, id, columnName} = action.payload;
            state.isActive = !state.isActive;
            state.source = 'Edit';
            state.name = name;
            state.description = description;
            state.id = id;
            state.columnName = columnName;
        }
    }
})


export const { setIsActiveAdd, setIsActiveEdit } = modalWindowSlice.actions;
export const modalState = (state) => state.modal;