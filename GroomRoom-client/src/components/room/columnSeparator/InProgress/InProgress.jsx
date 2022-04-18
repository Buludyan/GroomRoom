import { Draggable } from "react-beautiful-dnd";
import React, { useEffect, useState } from 'react';
import styles from './InProgress.module.scss';
import InProgressCard from '../../../cards/inProgressCard/InProgressCard';
import { useSelector } from "react-redux";
import { columnsState } from "../../../store/ColumnsSlice";
import LeftOpenCloseBtn from "../leftColumn/leftOpenCloseBtn/LeftOpenCloseBtn";
import RightOpenCloseBtn from "../rightColumn/rightOpenCloseBtn/RightOpenCloseBtn";
import { Button, Typography } from "@mui/material";
import UserCard from "./userCard/UserCard";
import VoteCard from "./voteCard/VoteCard";


const InProgress = ({ provided, snapshot, column }) => {

    const { isMobile, isLeftOpen, isRightOpen, users } = useSelector(columnsState);

    const [usersList, setUsersList] = useState({
        firstRow: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        secondRow: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    });

    const voteValues = [0.5, 1, 2, 3, 5, 8, 13, 21];

    useEffect(() => {
        const updatedUsers = [...users];
        updatedUsers.length = 10;
        updatedUsers.fill({}, users.length);
        setUsersList({
            firstRow: updatedUsers,
            secondRow: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
        })
    }, [users])

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
                <div className={styles.firstRow}>
                    {usersList.firstRow.map(((user, idx) => {
                        return (
                            <UserCard
                                key={idx}
                                user={user}
                            />)
                    }))}
                </div>
                <div className={styles.secondRow}>
                    {usersList.secondRow.map(((user, idx) => {
                        return (
                            <UserCard
                                key={idx}
                                user={user}
                            />)
                    }))}
                </div>
            </div>
            <div className={styles.voteCards}>
                {voteValues.map((value, idx) => {
                    return (
                        <VoteCard
                            value={value}
                            key={idx}
                        />
                    )
                })}
            </div>
            <Button
                variant='contained'
                sx={{
                    width: '16%',
                    height: '6%',
                    color: 'black',
                    backgroundColor: '#7AB6E2',
                    border: '2px solid #797979',
                    fontSize: '12px'
                }}
                className={styles.reveal}
            >
                Reveal points
            </Button>
            {provided.placeholder}
        </div>
    )
}

export default InProgress;