import React from 'react';
import { IconButton, Typography } from "@mui/material";
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { deleteModalState, setActive } from '../../store/DeleteMWSlice';
import styles from './DeleteMW.module.scss';
import { socketSend } from '../../helpers/socketSend';
import { columnsState, setColumns } from '../../store/ColumnsSlice';
import CloseIcon from '@mui/icons-material/Close';

const DeleteMW = () => {

    const dispatch = useDispatch();
    const { isActive, isAllDelete, column, item } = useSelector(deleteModalState);
    const { columns, socket, clientId } = useSelector(columnsState);


    const onItemDelete = () => {
        const todoId = Object.entries(columns).filter(column => column[1].name === 'To do')[0][0];
        const doneId = Object.entries(columns).filter(column => column[1].name === 'Done')[0][0];

        const curColumnId = column.name === 'To do' ? todoId : doneId;
        let items;

        if (isAllDelete) {
            items = [];
        } else {
            items = [...column.items].filter(it => it.id !== item.id);
        }

        const updatedColumns = {
            ...columns,
            [curColumnId]: {
                ...column,
                items: items
            },
        }

        dispatch(setActive({ isActive: false, isAllDelete: false }));
        dispatch(setColumns(updatedColumns));
        socketSend(socket, updatedColumns, clientId);
    }

    return (
        <div
            className={isActive
                ? styles.modalActive
                : styles.modal}
            onClick={() => dispatch(setActive({ isActive: false, isAllDelete: false }))}
        >
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <Typography
                    className={styles.header}
                    variant='h6'
                >
                    {isAllDelete ? 'Delete all cards?' : 'Delete this card?'}
                </Typography>
                <IconButton
                    onClick={() => dispatch(setActive({ isActive: false, isAllDelete: false }))}
                    className={styles.close}
                >
                    <CloseIcon />
                </IconButton>
                <Button
                    className={styles.delete}
                    onClick={onItemDelete}
                    variant='contained'
                    color='error'
                    sx={{ width: '60%' }}
                >
                    {isAllDelete ? 'Delete all' : 'Delete'}
                </Button>
            </div>

        </div>
    )
}

export default DeleteMW