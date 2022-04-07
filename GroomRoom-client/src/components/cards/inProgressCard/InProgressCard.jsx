import React from 'react';
import styles from './InProgressCard.module.scss'

const InProgressCard = ({ provided, item }) => {
  return (
    <div
      className={styles.cardInProgress}
      ref={provided.innerRef}
    //{...provided.draggableProps}
    //{...provided.dragHandleProps}
    >
      <h1>
        {item.content}
      </h1>
      <h2>{item.description}</h2>
      <a
        href="https://www.abc.xyz"
        target="_blank"
        rel="noreferrer"
        style={{
          textDecoration: 'none',
          fontSize: '30px',
        }}
      >
        Link
      </a>
    </div>
  )
}

export default InProgressCard;