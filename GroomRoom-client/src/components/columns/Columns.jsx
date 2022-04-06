import React from 'react';
import Column from './Column/Column';
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { columnsState, setAdminId, setClientId, setColumns, setSocket } from '../store/ColumnsSlice';
import { useEffect } from 'react';
import { socketSend } from '../helpers/socketSend';
import { useParams } from 'react-router-dom';
import { AddEditMW } from '../modalWindow/addEditMW/AddEditMW';
import { roomService } from '../DAL/roomService';


const Columns = () => {

    const params = useParams();

    const dispatch = useDispatch();

    const { columns, socket, clientId } = useSelector(columnsState);

    useEffect(() => {
        async function fetchData() {
            const isRoom = await roomService.isRoom(params.id);
            if(!isRoom.data) {
                window.location.href = `http://localhost:3000`;
            } 
        }
        fetchData();
    }, [params.id])

    
    useEffect(() => {
        const socket = new WebSocket(`ws://localhost:6060/`);
        dispatch(setSocket(socket));
        socket.onopen = () => {
            socket.send(JSON.stringify({
                id: params.id,
                method: "connection"
            }))
        }

        socket.onmessage = (event) => {
            let msg = JSON.parse(event.data)
            switch (msg.method) {
                case "connection":
                    if (msg.columns) {
                        const data = { '1': msg.columns[1], '2': msg.columns[2], '3': msg.columns[3] };
                        dispatch(setAdminId(msg.columns.adminId))
                        dispatch(setClientId(msg.id))
                        dispatch(setColumns(data));
                    }
                    break
                case "broadcast":
                    dispatch(setColumns(msg.columns))
                    break
                default: return;
            }

        }
    }, [dispatch, params.id]);



    const onDragEnd = (result) => {

        if (!result.destination) return;

        const { source, destination } = result;

        if (source.droppableId !== destination.droppableId) {
            const sourceColumn = columns[source.droppableId];
            const destColumn = columns[destination.droppableId];

            if (destColumn.name === 'In Progress' && destColumn.items.length === 1) {
                return onDragMove(columns, sourceColumn, source);
            }

            const sourceItems = [...sourceColumn.items];
            const destItems = [...destColumn.items];
            const [removed] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, removed);

            const updatedColumns = {
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems
                },
                [destination.droppableId]: {
                    ...destColumn,
                    items: destItems
                }
            }

            dispatch(setColumns(updatedColumns));
            socketSend(socket, updatedColumns, clientId);

        } else {
            const column = columns[source.droppableId];
            const copiedItems = [...column.items];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);

            const updatedColumns = {
                ...columns,
                [source.droppableId]: {
                    ...column,
                    items: copiedItems
                }
            }

            dispatch(setColumns(updatedColumns));
            socketSend(socket, updatedColumns, clientId);
        }
    };


    const onDragMove = (columns, sourceColumn, source) => {
        const keys = Object.entries(columns).map(el => el[0]);
        const toDoColumn = columns[keys[0]];
        const inProgressColumn = columns[keys[1]];
        const doneColumn = columns[keys[2]];
        const todoItems = [...toDoColumn.items];
        const inProgressItems = [...inProgressColumn.items];
        const doneItems = [...doneColumn.items];
        if (sourceColumn.name === 'To do') {
            doneItems.unshift(inProgressItems[0]);
            inProgressItems[0] = todoItems[source.index];
            todoItems.splice(source.index, 1);
        } else {
            todoItems.unshift(inProgressItems[0]);
            inProgressItems[0] = doneItems[source.index];
            doneItems.splice(source.index, 1);
        }

        const updatedColumns = {
            ...columns,
            [keys[0]]: {
                ...toDoColumn,
                items: todoItems
            },
            [keys[1]]: {
                ...inProgressColumn,
                items: inProgressItems
            },
            [keys[2]]: {
                ...doneColumn,
                items: doneItems
            },
        }

        dispatch(setColumns(updatedColumns));
        socketSend(socket, updatedColumns, clientId);
    }



    return (
        <div className='app'>
            <DragDropContext
                onDragEnd={result => onDragEnd(result)}
            >
                {Object.entries(columns).map(([columnId, column]) => {
                    return (
                        <div className='main'
                            key={columnId}
                        >
                            <div>
                                <Droppable droppableId={columnId} key={columnId}>
                                    {(provided, snapshot) => {
                                        return (
                                            <Column
                                                name={column.name}
                                                provided={provided}
                                                snapshot={snapshot}
                                                column={column}
                                            />
                                        );
                                    }}
                                </Droppable>
                            </div>
                        </div>
                    );
                })}
            </DragDropContext>
            <AddEditMW />
        </div>
    );
}

export default Columns