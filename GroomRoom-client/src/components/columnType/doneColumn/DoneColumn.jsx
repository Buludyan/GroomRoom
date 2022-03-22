import React from 'react';
import styles from './DoneColumn.module.scss'
import { Draggable } from "react-beautiful-dnd";
import Card from '../../card/Card';
import { useSelector } from "react-redux";
import { columnsState, setIsMobToDoneOpen } from "../../store/ColumnsSlice";
import { useDispatch } from 'react-redux';
import { IconButton, Typography } from '@mui/material';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';



const DoneColumn = ({
    provided,
    snapshot,
    column,
    name
}) => {

    const dispatch = useDispatch();
    const { isToDoneOpen, isMobToDoneOpen, isMobile } = useSelector(columnsState);

    const cls = [styles.column];

    cls.length = 1;

    if (!isToDoneOpen) cls.push(styles.close);
    if (isMobToDoneOpen) cls[1] = styles.active;

    return (
        <div
            className={cls.join(' ')}
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={isMobToDoneOpen ? null : {
                background: snapshot.isDraggingOver
                    ? "lightblue"
                    : "#D1F5FF",
            }}
        >
            {isMobile &&
                <IconButton
                    onClick={() => dispatch(setIsMobToDoneOpen(false))}
                    className={styles.mobCloseButton}
                >
                    <CancelOutlinedIcon
                        sx={{ fontSize: 30 }}
                    />
                </IconButton>
            }
            <Typography
                sx={{
                    fontWeight: 700,
                    fontSize: 30,
                    pb: 8.5,
                }}
            >
                {name}
            </Typography>
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

export default DoneColumn;