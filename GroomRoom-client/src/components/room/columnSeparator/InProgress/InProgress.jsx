import { Draggable } from "react-beautiful-dnd";
import React from 'react';
import styles from './InProgress.module.scss';
import CardInProgress from '../../../cardInProgress/CardInProgress';
import { useSelector } from "react-redux";
import { columnsState } from "../../../store/ColumnsSlice";
//import { Typography } from "@mui/material";
//import CancelIcon from '@mui/icons-material/Cancel';
//import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import MoveButtons from "./moveBtns/MoveButtons";
import LeftOpenCloseBtn from "../leftColumn/leftOpenCloseBtn/LeftOpenCloseBtn";
import RightOpenCloseBtn from "../rightColumn/rightOpenCloseBtn/RightOpenCloseBtn";


const InProgress = ({
    provided,
    snapshot,
    column,
    name
}) => {

    const { isMobile, isLeftOpen, isRightOpen } = useSelector(columnsState)

    return (
        <div
            className={styles.column}
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{
                background: snapshot.isDraggingOver
                    ? "lightblue"
                    : "#fff",
                right: isLeftOpen && isMobile && '-100%',
                left:  isRightOpen && isMobile && '-100%'
            }}
        >
            <div className={styles.header}>
                <LeftOpenCloseBtn />
                <RightOpenCloseBtn />
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

export default InProgress;