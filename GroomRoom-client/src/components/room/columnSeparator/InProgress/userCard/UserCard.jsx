import React from 'react';
import { useSelector } from 'react-redux';
import { authState } from '../../../../store/AuthSlice';
import styles from './UserCard.module.scss';

const UserCard = ({ cardUser }) => {

  const { user } = useSelector(authState);

  if (!Object.keys(cardUser).length) {
    return (
      <div className={styles.userCard}/>
    )
  }

  return (
    <div className={styles.userCard}>
      <div className={styles.name}>
        <p>{cardUser.name}</p>
        <p>{cardUser.surname}</p>
      </div>
      {!!cardUser.voteState.value &&
        <div
          className={styles.valueCard}
          style={{ visibility: 'visible' }}
        >
          <p>{cardUser.id !== user.id && cardUser.voteState.value !== 0 ? '?' : cardUser.voteState.value}</p>
        </div>
      }
    </div>
  )
}

export default UserCard