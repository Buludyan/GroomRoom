import { IconButton } from '@mui/material';
import React from 'react';
import MoveButtons from '../../room/columnSeparator/InProgress/moveBtns/MoveButtons';
import styles from './InProgressCard.module.scss';
import LinkIcon from '@mui/icons-material/Link';
import { Typography } from '@mui/material';


const InProgressCard = ({ provided, item }) => {
  return (
    <div
      className={styles.cardInProgress}
      ref={provided.innerRef}
    //{...provided.draggableProps}
    //{...provided.dragHandleProps}
    >
      <MoveButtons />
      <Typography variant='h4' className={styles.name}>{item.content}</Typography>
      <h2>{item.description}</h2>
      <IconButton
        className={styles.link}
        href="https://www.abc.xyz"
        target="_blank"
        rel="noreferrer"
        size='large'
      >
        <LinkIcon fontSize='large'/>
      </IconButton>
    </div>
  )
}

export default InProgressCard;