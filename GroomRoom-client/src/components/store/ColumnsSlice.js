import { v4 as uuid } from 'uuid';
import { createSlice } from "@reduxjs/toolkit";
import { Axios } from "../axios/axiosCofing";

const initialState = {
    columns: {
        [uuid()]: {
            name: "To do",
            items: []
        },
        [uuid()]: {
            name: "In Progress",
            items: []
        },
        [uuid()]: {
            name: "Done",
            items: []
        }
    },
    socket: null,
    isMobile: false,
    isLeftOpen: {
        status: true,
        source: 'todos'
    },
    isToDoneOpen: true,
    isMobLeftOpen: false,
    isMobToDoneOpen: false,
};


/*export const getTasks = createAsyncThunk(
    'columns/getTasks',
    async function () {
        const data = Axios.get('column/task/all')
        return data;
    }
)*/


export const columnsSlice = createSlice({
    name: 'columns',
    initialState,
    reducers: {
        setSocket: (state, action) => {
            state.socket = action.payload;
        },
        setColumns: (state, action) => {
            state.columns = { ...action.payload };
            //Axios.put('column/task', {...action.payload})
        },
        setIsMobile: (state, action) => {
            state.isMobile = action.payload;
        },
        setIsMobLeftOpen: (state, action) => {
            state.isMobLeftOpen = !state.isMobLeftOpen;
        },
        setIsMobToDoneOpen: (state, action) => {
            state.isMobToDoneOpen = !state.isMobToDoneOpen;
        },
        setLeftOpen: (state, action) => {
            state.isLeftOpen = { ...action.payload };
        },
        setToDoneOpen: (state, action) => {
            state.isToDoneOpen = !state.isToDoneOpen;
        },
    },
});

export const {
    setColumns,
    setLeftOpen,
    setToDoneOpen,
    setIsMobLeftOpen,
    setIsMobToDoneOpen,
    setIsMobile,
    setNewTask,
    setSocket
} = columnsSlice.actions;

export const columnsState = (state) => state.columns;