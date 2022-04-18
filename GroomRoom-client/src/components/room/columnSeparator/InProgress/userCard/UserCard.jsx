import React from 'react';
import styles from './UserCard.module.scss';

const UserCard = ({ user }) => {
  return (
    <div className={styles.userCard}>
      <div className={styles.name}>
        <p>{user.name}</p>
        <p>{user.surname}</p>
      </div>
      <div 
        className={styles.valueCard}
        style={{visibility: 'visible'}}
      >
        <p>?</p>
      </div>
    </div>
  )
}

export default UserCard