import React from 'react';
import { useSelector } from 'react-redux';
import { authState } from '../../../../../store/AuthSlice';
import { columnsState } from '../../../../../store/ColumnsSlice';
import styles from './UserCard.module.scss';

const UserCard = ({ cardUser }) => {

  const { isReveal } = useSelector(columnsState);
  const { user } = useSelector(authState);

  return (
    <div className={styles.userCard}>
      <div className={styles.userCard__inner}>
        <div className={styles.userCard__name}>
          <p>{cardUser.name}</p>
          <p>{cardUser.surname}</p>
        </div>
        {!!cardUser.voteState.value &&
          <div
            className={styles.userCard__valueCard}
            style={{ visibility: 'visible' }}
          >
            <p>
              {
                isReveal
                  ?
                  cardUser.voteState.value
                  :
                  cardUser.id !== user.id && cardUser.voteState.value !== 0 ? '?'
                    :
                    cardUser.voteState.value
              }
            </p>
          </div>
        }
      </div>

    </div>
  )
}

export default UserCard