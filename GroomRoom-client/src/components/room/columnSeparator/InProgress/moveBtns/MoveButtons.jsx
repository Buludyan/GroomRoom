import React from 'react';
import styles from './MoveButtons.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { columnsState, setColumns } from '../../../../store/ColumnsSlice';
import { Button, Typography } from '@mui/material';
import { socketSend } from '../../../../helpers/socketSend';
import { authState } from '../../../../store/AuthSlice';
import { zeroVoteState } from '../../../../helpers/zeroVoteState';
import { onReveal } from '../../../../helpers/onReveal';



const MoveButtons = ({ name }) => {

  const dispatch = useDispatch();
  const { user } = useSelector(authState);
  const { columns, socket, clientId, adminId, users, roomId, isReveal } = useSelector(columnsState);

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
        style={{ padding: '0', width: '110px', height: '35px' }}
        variant='contained'
        onClick={() => onButtonMove('todo')}
      >
        <Typography sx={{ color: 'black', fontSize: '10px' }}>Move to ToDo</Typography>
      </Button>
      <Typography variant='h4' >{name}</Typography>
      <Button
        style={{ padding: '0', width: '110px', height: '35px' }}
        variant='contained'
        onClick={() => onButtonMove('todone')}
      >
        <Typography sx={{ color: 'black', fontSize: '10px' }}>Move To Done</Typography>
      </Button>
    </div>
  )
}

export default MoveButtons;