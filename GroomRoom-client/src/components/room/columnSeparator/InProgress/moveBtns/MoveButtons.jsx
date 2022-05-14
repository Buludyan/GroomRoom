import React from 'react';
import styles from './MoveButtons.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { columnsState, setColumns } from '../../../../store/ColumnsSlice';
import { Button, Typography } from '@mui/material';
import { socketSend } from '../../../../helpers/socketSend';
import { authState } from '../../../../store/AuthSlice';
import { zeroVoteState } from '../../../../helpers/zeroVoteState';
import { onReveal } from '../../../../helpers/onReveal';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const MoveButtons = () => {

  const dispatch = useDispatch();
  const { user } = useSelector(authState);
  const { columns, socket, clientId, adminId, users, roomId, isReveal, isMobile } = useSelector(columnsState);

  const onButtonMove = (dir) => {
    const keys = Object.entries(columns).map(el => el[0]);
    let dirKeys = [];
    dir === 'todo' ? dirKeys = [keys[1], keys[0]] : dirKeys = [keys[1], keys[2]];
    const sourceColumn = columns[dirKeys[0]]
    const destColumn = columns[dirKeys[1]]
    if (sourceColumn.items.length === 1) {
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      destItems.unshift(sourceItems[0]);
      sourceItems.length = 0;

      const updatedColumns = {
        ...columns,
        [dirKeys[0]]: {
          ...sourceColumn,
          items: sourceItems
        },
        [dirKeys[1]]: {
          ...destColumn,
          items: destItems
        },
      }

      isReveal && onReveal(socket, clientId, roomId);
      zeroVoteState(users, socket, clientId, roomId);
      dispatch(setColumns(updatedColumns));
      socketSend(socket, updatedColumns, clientId);
    }
  }


  if (user.id !== adminId) return (<div></div>);

  return (
    <div className={styles.buttons}>
      <Button
        variant='contained'
        onClick={() => onButtonMove('todo')}
      >
        {isMobile ?
          <ArrowLeftIcon fontSize='large' />
          :
          <Typography sx={{ fontSize: '15px' }}>Move to ToDo</Typography>
        }
      </Button>
      <Button
        variant='contained'
        onClick={() => onButtonMove('todone')}
      >
        {isMobile ?
          <ArrowRightIcon fontSize='large' />
          :
          <Typography sx={{ fontSize: '15px' }}>Move To Done</Typography>
        }
      </Button>
    </div>
  )
}

export default MoveButtons;