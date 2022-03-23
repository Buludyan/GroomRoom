import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { columnsState, setColumns } from '../store/ColumnsSlice';
import styles from './ModalWindow.module.scss';
import { v4 as uuid } from 'uuid';
import { modalState, setIsActiveAdd } from '../store/ModalWindowSlice';
import { Button, TextField } from '@mui/material';
import { socketSend } from '../helpers/socketSend';



export const ModalWindow = () => {

    const dispatch = useDispatch();
    const { columns, socket } = useSelector(columnsState);
    const { isActive, name, description, source, id, columnName } = useSelector(modalState);

    const [inputData, setInputData] = useState({
        taskName: '',
        taskDes: ''
    })

    const [editInputData, setEditInputData] = useState({
        taskName: name,
        taskDes: description
    })


    useEffect(() => setEditInputData({
        taskName: name,
        taskDes: description
    }), [source])

    const onChange = (event) => {
        setInputData({
            ...inputData,
            [event.target.name]: event.target.value
        })
    }

    const onEditChange = (event) => {
        setEditInputData({
            ...editInputData,
            [event.target.name]: event.target.value
        })
    }

    const onTaskAdd = () => {
        const todoId = Object.entries(columns).filter(column => column[1].name === 'To do')[0][0];
        const todoColumn = columns[todoId];
        const todoItems = [...todoColumn.items];

        const newTask = {
            id: uuid(),
            content: inputData.taskName,
            description: inputData.taskDes
        }

        todoItems.unshift(newTask);

        const updatedColumns = {
            ...columns,
            [todoId]: {
                ...todoColumn,
                items: todoItems
            },
        }

        dispatch(setColumns(updatedColumns));
        socketSend(socket, updatedColumns);

        setInputData({
            taskName: '',
            taskDes: ''
        })
    }


    const onTaskEdit = () => {
        const todoId = Object.entries(columns).filter(column => column[1].name === 'To do')[0][0];
        const doneId = Object.entries(columns).filter(column => column[1].name === 'Done')[0][0];

        const curColumnId = columnName === 'To do' ? todoId : doneId;

        const column = columns[curColumnId];

        const items = [...column.items].map(it => it.id === id ?
            it = {
                ...it,
                content: editInputData.taskName,
                description: editInputData.taskDes
            }
            :
            it
        )

        const updatedColumns = {
            ...columns,
            [curColumnId]: {
                ...column,
                items: items
            },
        }

        dispatch(setColumns(updatedColumns));
        socketSend(socket, updatedColumns);
    }

    return (
        <div
            className={isActive
                ? styles.modalActive
                : styles.modal}
            onClick={() => dispatch(setIsActiveAdd())}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.form}>
                    <TextField
                        variant='outlined'
                        label='Task name'
                        name='taskName'
                        onChange={source === 'Edit' ? (e) => onEditChange(e) : (e) => onChange(e)}
                        value={source === 'Edit' ? editInputData.taskName : inputData.taskName}
                    />
                    <br />
                    <TextField
                        variant='outlined'
                        label='Task description'
                        name='taskDes'
                        onChange={source === 'Edit' ? (e) => onEditChange(e) : (e) => onChange(e)}
                        value={source === 'Edit' ? editInputData.taskDes : inputData.taskDes}
                    />
                    <br />
                    {

                    }
                    {source === 'Edit' ?
                        <Button variant='contained' 
                            sx={{backgroundColor: '#7D53DE'}} 
                            onClick={() => onTaskEdit()}
                        >
                            Edit task
                        </Button>
                        :
                        <Button 
                            variant='contained' 
                            onClick={() => onTaskAdd()}
                            sx={{backgroundColor: '#7D53DE'}}
                        > 
                            Add task 
                        </Button>
                    }
                </div>
            </div>
        </div>
    )
}