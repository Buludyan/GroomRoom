import React from 'react';
import styles from './VoteCard.module.scss';


const VoteCard = ({ value, onVote, isDisabled }) => {

    return (
        <div 
            className={styles.voteCard}
            onClick={isDisabled ? null : () => onVote(value, true)}
            style={{
                color: isDisabled ? 'rgba(21, 22, 30, 0.5)' : '#000'
            }}
        >
            <div className={styles.value}>
                {value}
            </div>
        </div>
    )
}

export default VoteCard;