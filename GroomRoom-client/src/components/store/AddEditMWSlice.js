import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isActive: false,
    source: '',
    name: '',
    description: '',
    link: '',
    id: null,
    columnName: ''
}

export const addEditMWSlice = createSlice({
    name: 'modal window',
    initialState,
    reducers: {
        setIsActiveAdd: (state) => {
            state.isActive = !state.isActive;
            state.source = 'Add';
            state.name = '';
            state.description = '';
            state.link = '';
        },
        setIsActiveEdit: (state, action) => {
            const {name, description, link, id, columnName} = action.payload;
            state.isActive = !state.isActive;
            state.source = 'Edit';
            state.name = name;
            state.description = description;
            state.link = link;
            state.id = id;
            state.columnName = columnName;
        },
        closeEdit: (state) => {
            state.isActive = false;
        }
    }
})


export const { setIsActiveAdd, setIsActiveEdit, closeEdit } = addEditMWSlice.actions;
export const addEditModalState = (state) => state.addEditmodal;