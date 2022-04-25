import { Button, IconButton } from '@mui/material';
import styles from './NextTaskBtns.module.scss'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { columnsState, setColumns } from '../../../../store/ColumnsSlice';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { socketSend } from '../../../../helpers/socketSend';
import { zeroVoteState } from '../../../../helpers/zeroVoteState';
import { onReveal } from '../../../../helpers/onReveal';

const NextTaskBtns = () => {

    const dispatch = useDispatch();
    const { columns, socket, clientId, users, voteValues, roomId } = useSelector(columnsState);
    const [count, setCount] = useState(0);

    useEffect(() => {
        const values = []
        users.map((user) => values.push(user.voteState.value));
        const midValue = Math.floor(values.reduce((acc, value) => acc + value, 0) / values.length);
        const idx = voteValues.findIndex(value => midValue < value);
        let value;
        if (idx < 1) {
            value = voteValues.find(val => val === midValue);
        } else {
            value = Math.abs(voteValues[idx] - midValue) < Math.abs(voteValues[idx - 1] - midValue)
                ? voteValues[idx]
                : voteValues[idx - 1];
        }

        setCount(value);
    }, [users, voteValues]);


    const onNextTask = () => {
        const keys = Object.entries(columns).map(el => el[0]);
        const toDoColumn = columns[keys[0]];
        const inProgressColumn = columns[keys[1]];
        const doneColumn = columns[keys[2]];
        const todoItems = [...toDoColumn.items];
        const inProgressItems = [...inProgressColumn.items];
        const doneItems = [...doneColumn.items];
        if (!inProgressItems.length) {
            inProgressItems[0] = todoItems.shift();
        } else {
            inProgressItems[0] = { ...inProgressItems[0], value: count > 0 ? count : 0 };
            doneItems.unshift(inProgressItems[0]);
            todoItems.length ?
                inProgressItems[0] = todoItems.shift()
                :
                inProgressItems.length = 0;
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

        onReveal(socket, clientId, roomId);
        zeroVoteState(users, socket, clientId, roomId);
        dispatch(setColumns(updatedColumns));
        socketSend(socket, updatedColumns, clientId);
    }

    return (
        <div className={styles.nextTaskBtns}>
            <div className={styles.counter}>
                <IconButton
                    onClick={() => setCount(voteValues[voteValues.findIndex(value => value === count) - 1])}
                >
                    <KeyboardArrowLeftIcon />
                </IconButton>
                <p className={styles.count}>{count}</p>
                <IconButton
                    onClick={() => setCount(voteValues[voteValues.findIndex(value => value === count) + 1])}
                >
                    <KeyboardArrowRightIcon />
                </IconButton>
            </div>
            <Button
                variant="contained"
                onClick={onNextTask}
            >
                Next task
            </Button>
        </div>
    )
}

export default NextTaskBtns;