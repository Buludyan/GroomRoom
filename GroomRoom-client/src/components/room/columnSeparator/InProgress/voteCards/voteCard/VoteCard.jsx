import React from 'react';
import styles from './VoteCard.module.scss';


const VoteCard = ({ value, onVote, isDisabled }) => {

    return (
        <button 
            className={styles.voteCard}
            disabled={isDisabled}
            onClick={() => onVote(value, true)}
        >
            <div className={styles.voteCard__value}>
                {value}
            </div>
        </button>
    )
}

export default VoteCard;