import { Draggable } from "react-beautiful-dnd";
import React, { useEffect } from 'react';
import styles from './InProgressColumn.module.scss';
import CardInProgress from '../../cardInProgress/CardInProgress';
import { useDispatch, useSelector } from "react-redux";
import {
    columnsState,
    setIsMobile,
    setIsMobToDoneOpen,
    setToDoneOpen,
} from "../../store/ColumnsSlice";
import { IconButton, Typography } from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import MoveButtons from "./moveButtons/MoveButtons";
import LeftOpenCloseBtn from "../../leftColumn/leftOpenCloseBtn/LeftOpenCloseBtn";

const InProgressColumn = ({
    provided,
    snapshot,
    column,
    name
}) => {

    const { isMobile, isMobToDoneOpen, isLeftOpen, isToDoneOpen } = useSelector(columnsState)
    const dispatch = useDispatch();

    const doneBtnCls = [styles.doneButton];
    !isToDoneOpen ? doneBtnCls.push(styles.doneClose) : doneBtnCls.length = 1;

    const checkIsMobile = () => {
        if (window.innerWidth <= 960) {
            dispatch(setIsMobile(true));
        } else {
            dispatch(setIsMobile(false));
        }
    }

    useEffect(() => checkIsMobile, []);

    window.addEventListener('resize', checkIsMobile);


    const onToDoneOpen = () => {
        isMobile ?
            dispatch(setIsMobToDoneOpen()) :
            dispatch(setToDoneOpen());
    }

    return (
        <div
            className={styles.column}
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{
                background: snapshot.isDraggingOver
                    ? "lightblue"
                    : "#fff",
                right: isLeftOpen.status && isMobile && '-100%',
                left: isMobToDoneOpen && '-100%'
            }}
        >
            <div className={styles.header}>
                <LeftOpenCloseBtn />
                <Typography
                    className={styles.columnName}
                    sx={{
                        fontWeight: 700,
                        fontSize: 30,
                    }}
                >
                    {name}
                </Typography>
                <IconButton
                    onClick={() => onToDoneOpen()}
                    variant='contained'
                    className={doneBtnCls.join(' ')}
                >
                    {isToDoneOpen && !isMobile ?
                        <CancelIcon sx={{ fontSize: 30 }} />
                        : <ArrowCircleLeftIcon sx={{ fontSize: 30 }}
                        />}
                </IconButton>
            </div>

            <MoveButtons />
            {column.items.map((item, index) => {
                return (
                    <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                    >
                        {(provided, snapshot) => {
                            if (column.items.length > 0) {
                                return <CardInProgress
                                    provided={provided}
                                    snapshot={snapshot}
                                    column={column}
                                    item={item}
                                />
                            }
                        }}
                    </Draggable>
                );
            })}
            {provided.placeholder}
        </div>
    )
}

export default InProgressColumn;