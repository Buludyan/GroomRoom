import { Draggable } from "react-beautiful-dnd";
import React, { useEffect } from 'react';
import styles from './InProgress.module.scss';
import InProgressCard from '../../../cards/inProgressCard/InProgressCard';
import { useDispatch, useSelector } from "react-redux";
import { columnsState, setAllVoted, setUsers, setVoted } from "../../../store/ColumnsSlice";
import LeftOpenCloseBtn from "../leftColumn/leftOpenCloseBtn/LeftOpenCloseBtn";
import RightOpenCloseBtn from "../rightColumn/rightOpenCloseBtn/RightOpenCloseBtn";
import { Button } from "@mui/material";
import { authState } from "../../../store/AuthSlice";
import NextTaskBtns from "./nextTaskBtns/NextTaskBtns";
import { onReveal } from "../../../helpers/onReveal";
import { zeroVoteState } from "../../../helpers/zeroVoteState";
import { sortUsers } from "../../../helpers/sortUsers";
import VoteCards from "./voteCards/VoteCards";
import CurtainsIcon from '@mui/icons-material/Curtains';
import UserCards from "./userCards/UserCards";
import PlaceholderCard from "../../../cards/placeholderCard/PlaceholderCard";

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
        roomId,
        isReveal,
        isVoted,
        isAllVoted,
    } = useSelector(columnsState);

    const { user } = useSelector(authState);

    useEffect(() => {
        let check = users.find(user => user.voteState.value === 0 && user.id !== adminId);
        if (
            users.length === 1
            && users[0].id === adminId
            && users[0].voteState.value === 0
        ) check = !check;

        dispatch(setAllVoted(!!check));

    }, [users, adminId, dispatch]);

    const onVote = (value, state) => {
        if (!column.items.length) return;
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

        dispatch(setVoted(state));
    }

    const onRevoteAllHandler = () => {
        onReveal(socket, clientId, roomId);
        zeroVoteState(users, socket, clientId, roomId);
    }

    const onRevealHandler = () => {
        onReveal(socket, clientId, roomId);
        sortUsers(socket, roomId, users, clientId);
    }

    return (
        <div className={styles.inProgress}
            style={{
                right: isLeftOpen && isMobile && '-100%',
                left: isRightOpen && isMobile && '-100%'
            }}
        >
            <div className={styles.header}>
                <LeftOpenCloseBtn />
                <RightOpenCloseBtn />
            </div>
            <div
                className={styles.column}
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                    background: snapshot.isDraggingOver
                        ? "lightblue"
                        : "#fff",
                }}
            >
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
                            <PlaceholderCard 
                            />}
                    </div>}
                {provided.placeholder}
            </div>
            <UserCards />

            {
                isReveal ?
                    user.id === adminId && <div
                        className={styles.revoteAll}
                    >
                        <Button
                            variant="contained"
                            onClick={onRevoteAllHandler}
                        >
                            Revote all
                        </Button>
                    </div>
                    :
                    isVoted ?
                        <div className={styles.revote}>
                            <Button
                                variant="contained"
                                onClick={() => onVote(0, false)}
                            >
                                Revote
                            </Button>
                        </div>
                        :
                        <VoteCards onVote={onVote} isDisabled={!column.items.length} />
            }
            {
                isReveal ?
                    user.id === adminId && <div
                        className={styles.nextTask}
                    >
                        <NextTaskBtns />
                    </div>
                    :
                    user.id === adminId &&
                    <div
                        className={styles.reveal}
                    >
                        <Button
                            disabled={!isAllVoted || !column.items.length}
                            onClick={onRevealHandler}
                            variant='contained'
                        >
                            {isMobile ?
                                <CurtainsIcon fontSize="large" sx={{ height: '30px' }} />
                                :
                                'Reveal points'
                            }
                        </Button>
                    </div>
            }
        </div>
    )
}

export default InProgress;