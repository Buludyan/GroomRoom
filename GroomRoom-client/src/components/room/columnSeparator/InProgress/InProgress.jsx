import { Draggable } from "react-beautiful-dnd";
import React from 'react';
import styles from './InProgress.module.scss';
import InProgressCard from '../../../cards/inProgressCard/InProgressCard';
import { useSelector } from "react-redux";
import { columnsState } from "../../../store/ColumnsSlice";
//import { Typography } from "@mui/material";
//import CancelIcon from '@mui/icons-material/Cancel';
//import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import MoveButtons from "./moveBtns/MoveButtons";
import LeftOpenCloseBtn from "../leftColumn/leftOpenCloseBtn/LeftOpenCloseBtn";
import RightOpenCloseBtn from "../rightColumn/rightOpenCloseBtn/RightOpenCloseBtn";
import { Typography } from "@mui/material";
import UserCard from "./userCard/UserCard";


const InProgress = ({
    provided,
    snapshot,
    column,

}) => {

    const { isMobile, isLeftOpen, isRightOpen, users } = useSelector(columnsState)

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
                left: isRightOpen && isMobile && '-100%'
            }}
        >
            <div className={styles.header}>
                <LeftOpenCloseBtn />
                <RightOpenCloseBtn />
            </div>
            {column.items.map((item, index) => {
                return (
                    <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                    >
                        {(provided, snapshot) => {
                            if (column.items.length > 0) {
                                return <InProgressCard
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
            {!column.items.length &&
                <div className={styles.cardPlaceholder}>
                    {snapshot.isDraggingOver &&
                        <Typography variant='h4'>
                            Drop card here
                        </Typography>}
                </div>}
            <div className={styles.users}>
                {users.length && users.map(((user, idx) => {
                    return (
                        <UserCard
                            key={idx}
                            email={user.email}
                        />)
                }))}
            </div>

            <MoveButtons />

            {provided.placeholder}
        </div>
    )
}

export default InProgress;