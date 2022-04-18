import React from 'react';
import { useSelector } from 'react-redux';
import { authState } from '../../../../store/AuthSlice';
import { columnsState } from '../../../../store/ColumnsSlice';
import styles from './VoteCard.module.scss';


const VoteCard = ({ value }) => {

    const { user } = useSelector(authState);
    const { socket, clientId, roomId } = useSelector(columnsState);

    const setVotingValue = () => {
        socket.send(JSON.stringify({
            method: 'voting',
            userId: user.id,
            id: clientId,
            roomId,
            value

        }))
    }

    return (
        <div 
            className={styles.voteCard}
            onClick={setVotingValue}
        >
            <div className={styles.value}>
                {value}
            </div>
        </div>
    )
}

export default VoteCard;