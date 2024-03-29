import React from 'react';
import styles from './Room.module.scss';
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import {
    columnsState,
    setAdminId,
    setClientId,
    setColumns,
    setReveal,
    setRoomId,
    setSocket,
    setUsers,
    setVoted
} from '../store/ColumnsSlice';
import { useEffect } from 'react';
import { socketSend } from '../helpers/socketSend';
import { useParams } from 'react-router-dom';
import { AddEditMW } from '../modalWindow/addEditMW/AddEditMW';
import { roomService } from '../axios/service/roomService';
import ColumnSeparator from './columnSeparator/ColumnSeparator';
import { authState } from '../store/AuthSlice';
import { setWsHeartbeat } from "ws-heartbeat/client";
import { onReveal } from '../helpers/onReveal';
import { zeroVoteState } from '../helpers/zeroVoteState';
import DeleteMW from '../modalWindow/deleteMW/DeleteMW';
import DescriptionMW from '../modalWindow/descriptionMW/DescriptionMW';


const Room = () => {

    const params = useParams();
    const dispatch = useDispatch();
    const { user } = useSelector(authState);
    const { columns, socket, clientId, roomId, users, isReveal } = useSelector(columnsState);

    useEffect(() => {
        async function fetchData() {
            const isRoom = await roomService.isRoom(params.id);
            if (!isRoom.data) {
                window.location.href = process.env.REACT_APP_BASE_DOMEN;
            }
        }
        fetchData();
    }, [params.id])


    useEffect(() => {
        const socket = new WebSocket(process.env.REACT_APP_WS_URL);

        dispatch(setSocket(socket));
        socket.onopen = () => {
            user.id && socket.send(JSON.stringify({
                id: params.id,
                method: "connection",
                user: { ...user, voteState: { value: 0 } }
            }))
            user.id && setWsHeartbeat(socket, '{"kind":"ping"}', {
                pingTimeout: 60000, // in 60 seconds, if no message accepted from server, close the connection.
                pingInterval: 5000, // every 5 seconds, send a ping message to the server.
            });
        }

        socket.onmessage = (event) => {
            let msg = JSON.parse(event.data)
            switch (msg.method) {
                case "connection":
                    if (msg.data) {
                        const data = { '1': msg.data[1], '2': msg.data[2], '3': msg.data[3] };
                        dispatch(setColumns(data));
                        dispatch(setRoomId(msg.data.roomId));
                        dispatch(setAdminId(msg.data.adminId));
                        dispatch(setClientId(msg.id));
                        dispatch(setUsers(msg.data.users));
                        dispatch(setReveal(msg.data.isReveal))
                    }
                    break
                case "broadcast":
                    dispatch(setColumns(msg.data))
                    break
                case "close":
                    dispatch(setUsers(msg.data));
                    break
                case "voting":
                    dispatch(setUsers(msg.data));
                    break
                case "revoteAll":
                    dispatch(setVoted(false));
                    break
                case "reveal":
                    dispatch(setReveal(msg.data));
                    break
                case "sortUsers":
                    dispatch(setUsers(msg.data));
                    break
                default: return;
            }
        }
        socket.onclose = (event) => console.log(event)
    }, [dispatch, params.id, user]);


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

        isReveal && onReveal(socket, clientId, roomId);
        zeroVoteState(users, socket, clientId, roomId)
        dispatch(setColumns(updatedColumns));
        socketSend(socket, updatedColumns, clientId);
    }

    return (
        <div className={styles.room}>
            <div className={styles.room__inner}>
                <div className={styles.room__columns}>
                    <DragDropContext
                        onDragEnd={result => onDragEnd(result)}
                    >
                        {Object.entries(columns).map(([columnId, column]) => {
                            return (
                                <Droppable droppableId={columnId} key={columnId}>
                                    {(provided, snapshot) => {
                                        return (
                                            <ColumnSeparator
                                                name={column.name}
                                                provided={provided}
                                                snapshot={snapshot}
                                                column={column}
                                            />
                                        );
                                    }}
                                </Droppable>
                            );
                        })}
                    </DragDropContext>
                </div>
            </div>
            <AddEditMW />
            <DeleteMW />
            <DescriptionMW />
        </div>
    );
}

export default Room;