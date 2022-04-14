import React from 'react';
import styles from './UserCard.module.scss';

const UserCard = ({ email }) => {
  return (
    <div className={styles.user}>{email}</div>
  )
}

export default UserCard