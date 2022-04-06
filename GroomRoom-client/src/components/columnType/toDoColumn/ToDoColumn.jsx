import React from 'react';
import styles from './ToDoColumn.module.scss'
import { Draggable } from "react-beautiful-dnd";
import Card from '../../card/Card';
import { useDispatch } from 'react-redux';
import { setIsActiveAdd } from '../../store/AddEditMWSlice';
import { IconButton, Typography } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const ToDoColumn = ({
    provided,
    snapshot,
    column,
    name,
}) => {

    const dispatch = useDispatch();

    return (
        <div
            className={styles.column}
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{
                background: snapshot.isDraggingOver
                    ? "lightblue"
                    : "#D1F5FF",
            }}
        >
            <Typography
                sx={{
                    fontWeight: 700,
                    fontSize: 30,
                    pb: 2,
                }}
            >
                {name}
            </Typography>
            <IconButton
                className={styles.addButton}
                onClick={() => dispatch(setIsActiveAdd())}
            >
                <AddCircleOutlineIcon
                    sx={{ fontSize: 35 }}
                />
            </IconButton>
            {column.items.map((item, index) => {
                return (
                    <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                    >
                        {(provided, snapshot) => {
                            return (
                                <Card
                                    provided={provided}
                                    snapshot={snapshot}
                                    column={column}
                                    item={item}
                                />
                            );
                        }}
                    </Draggable>
                );
            })}
            {provided.placeholder}
        </div>
    )
}

export default ToDoColumn;