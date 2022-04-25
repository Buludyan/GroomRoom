import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    columns: {
        '1': {
            name: "To do",
            items: []
        },
        '2': {
            name: "In Progress",
            items: []
        },
        '3': {
            name: "Done",
            items: []
        }
    },
    users: [],
    votingData: [],
    socket: null,
    roomId: null,
    adminId: null,
    clientId: null,
    isVoted: false,
    isAllVoted: false,
    isReveal: false,
    isMobile: false,
    isLeftOpen: true,
    isRightOpen: true,
    voteValues: [0.5, 1, 2, 3, 5, 8, 13, 21]
};


export const columnsSlice = createSlice({
    name: 'columns',
    initialState,
    reducers: {
        setSocket: (state, action) => {
            state.socket = action.payload;
        },
        setClientId: (state, action) => {
            state.clientId = action.payload;
        },
        setAdminId: (state, action) => {
            state.adminId = action.payload;
        },
        setRoomId: (state, action) => {
            state.roomId = action.payload;
        },
        setColumns: (state, action) => {
            state.columns = { ...action.payload };

        },
        setUsers: (state, action) => {
            state.users = [ ...action.payload ];
        },
        setVoted: (state, action) => {
            state.isVoted = action.payload;
        },
        setAllVoted: (state, action) => {
            state.isAllVoted = !action.payload;
        },
        setReveal: (state, action) => {
            state.isReveal = action.payload;
        },
        setIsMobile: (state, action) => {
            state.isMobile = action.payload;
        },
        setLeftOpen: (state, action) => {
            state.isLeftOpen = !state.isLeftOpen;
        },
        setRightOpen: (state, action) => {
            state.isRightOpen = !state.isRightOpen;
        },
    },
});

export const {
    setColumns,
    setLeftOpen,
    setRightOpen,
    setIsMobile,
    setNewTask,
    setSocket,
    setClientId,
    setAdminId,
    setRoomId,
    setUsers,
    setAllVoted,
    setReveal,
    setVoted
} = columnsSlice.actions;

export const columnsState = (state) => state.columns;