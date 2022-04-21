import React from 'react';
import styles from './VoteCard.module.scss';


const VoteCard = ({ value, onVote }) => {

    return (
        <div 
            className={styles.voteCard}
            onClick={() => onVote(value, true)}
        >
            <div className={styles.value}>
                {value}
            </div>
        </div>
    )
}

export default VoteCard;