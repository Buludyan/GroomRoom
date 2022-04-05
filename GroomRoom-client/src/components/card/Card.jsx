import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { columnsState, setColumns } from '../store/ColumnsSlice';
import styles from './Card.module.scss';
import { setIsActiveEdit } from '../store/AddEditMWSlice';
import { IconButton, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import LinkIcon from '@mui/icons-material/Link';
import DeleteIcon from '@mui/icons-material/Delete';
import { socketSend } from '../helpers/socketSend';

const Card = ({ provided, snapshot, column, item }) => {

    const dispatch = useDispatch();
    const { columns, socket, clientId } = useSelector(columnsState);

    const onItemDelete = () => {
        const todoId = Object.entries(columns).filter(column => column[1].name === 'To do')[0][0];
        const doneId = Object.entries(columns).filter(column => column[1].name === 'Done')[0][0];

        const curColumnId = column.name === 'To do' ? todoId : doneId;

        const items = [...column.items].filter(it => it.id !== item.id);

        const updatedColumns = {
            ...columns,
            [curColumnId]: {
                ...column,
                items: items
            },
        }
        
        dispatch(setColumns(updatedColumns));
        socketSend(socket, updatedColumns, clientId);
    }

    const onItemEdit = () => {
        dispatch(setIsActiveEdit({
            columnName: column.name, 
            name: item.content, 
            description: item.description, 
            id: item.id 
        }))
    }


    return (
        <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={
                snapshot.isDragging ?
                    styles.draggingCard :
                    column.name === 'In Progress' ?
                        styles.inProgress :
                        styles.card
            }
            style={{
                ...provided.draggableProps.style,
                backgroundColor: snapshot.isDragging
                    ? "#263B4A"
                    : "#456C86",
            }}
        >
            <div className={styles.cardHeader}>
                <Typography
                    component='p'
                    sx={{ fontSize: 20 }}
                >
                    {item.content}
                </Typography>
                <div className={styles.buttons}>
                    <IconButton 
                        onClick={() => onItemEdit()}
                    >
                        <EditIcon  
                            sx={{color: '#fff'}}
                        />
                    </IconButton>
                    <IconButton
                        onClick={() => onItemDelete()}
                    >
                        <DeleteIcon 
                            sx={{color: '#fff'}}
                        />
                    </IconButton>
                </div>
            </div>
            <p style={{ fontSize: '12px' }}>
                {item.description}
            </p>
            <IconButton
                className={styles.link}
                href="https://www.abc.xyz"
                target="_blank"
                rel="noreferrer"
            >
                <LinkIcon
                />
            </IconButton>

        </div>
    )
}

export default Card