import { Draggable } from "react-beautiful-dnd";
import React, { useEffect, useState } from 'react';
import styles from './InProgress.module.scss';
import InProgressCard from '../../../cards/inProgressCard/InProgressCard';
import { useDispatch, useSelector } from "react-redux";
import { columnsState, setUsers } from "../../../store/ColumnsSlice";
import LeftOpenCloseBtn from "../leftColumn/leftOpenCloseBtn/LeftOpenCloseBtn";
import RightOpenCloseBtn from "../rightColumn/rightOpenCloseBtn/RightOpenCloseBtn";
import { Button, Typography } from "@mui/material";
import UserCard from "./userCard/UserCard";
import VoteCard from "./voteCard/VoteCard";
import { authState } from "../../../store/AuthSlice";


const InProgress = ({ provided, snapshot, column }) => {

    const dispatch = useDispatch();
    const {
        isMobile,
        isLeftOpen,
        isRightOpen,
        users,
        socket,
        clientId,
        adminId,
        roomId } = useSelector(columnsState);
    const { user } = useSelector(authState);

    const [usersList, setUsersList] = useState({
        firstRow: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        secondRow: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    })

    const [isVoted, setVoted] = useState(false)
    const voteValues = [0.5, 1, 2, 3, 5, 8, 13, 21];

    useEffect(() => {
        const updatedUsers = [...users];
        updatedUsers.length = 10;
        updatedUsers.fill({}, users.length);
        setUsersList({
            firstRow: updatedUsers,
            secondRow: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
        })
    }, [users]);

    const onVote = (value, state) => {
        const updatedUsers = [...users];
        const curUserIdx = updatedUsers.findIndex(us => us.id === user.id);
        const curUser = { ...updatedUsers[curUserIdx] };
        curUser.voteState = { value };
        updatedUsers[curUserIdx] = curUser;

        dispatch(setUsers(updatedUsers));

        socket.send(JSON.stringify({
            method: 'voting',
            id: clientId,
            roomId,
            updatedUsers,
        }))

        setVoted(state);
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
                    {usersList.firstRow.map(((cardUser, idx) => {
                        return (
                            <UserCard
                                key={idx}
                                cardUser={cardUser}
                            />)
                    }))}
                </div>
                <div className={styles.secondRow}>
                    {usersList.secondRow.map(((cardUser, idx) => {
                        return (
                            <UserCard
                                key={idx}
                                cardUser={cardUser}
                            />)
                    }))}
                </div>
            </div>
            {isVoted ?
                <div className={styles.revote}>
                    <Button
                        variant="contained"
                        onClick={() => onVote(0, false)}
                    >
                        Revote
                    </Button>
                </div>

                :
                <div className={styles.voteCards}>
                    {voteValues.map((value, idx) => {
                        return (
                            <VoteCard
                                onVote={onVote}
                                value={value}
                                key={idx}
                            />
                        )
                    })}
                </div>
            }
            {
                user.id === adminId &&
                <div
                    className={styles.reveal}
                >
                    <Button
                        variant='contained'
                    >
                        Reveal points
                    </Button>
                </div>
            }
            {provided.placeholder}
        </div>
    )
}

export default InProgress;