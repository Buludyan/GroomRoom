import React from 'react';
import styles from './MoveButtons.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { columnsState, setColumns } from '../../../store/ColumnsSlice';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Button, IconButton } from '@mui/material';
import { socketSend } from '../../../helpers/socketSend';


const onButtonMove = (columns, dispatch, setColumns, dir, socket) => {
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

    dispatch(setColumns(updatedColumns));
    socketSend(socket, updatedColumns);
  }
}


const onNextTask = (columns, dispatch, setColumns, socket) => {
  console.log(columns)
  const keys = Object.entries(columns).map(el => el[0]);
  const toDoColumn = columns[keys[0]];
  const inProgressColumn = columns[keys[1]];
  const doneColumn = columns[keys[2]];
  const todoItems = [...toDoColumn.items];
  if (!todoItems.length) return;
  const inProgressItems = [...inProgressColumn.items];
  const doneItems = [...doneColumn.items];
  if (!inProgressItems.length) {
    inProgressItems[0] = todoItems.shift();
  } else {
    doneItems.unshift(inProgressItems[0]);
    inProgressItems[0] = todoItems.shift();
  }

  const updatedColumns = {
    ...columns,
    [keys[0]]: {
      ...toDoColumn,
      items: todoItems
    },
    [keys[1]]: {
      ...inProgressColumn,
      items: inProgressItems
    },
    [keys[2]]: {
      ...doneColumn,
      items: doneItems
    },
  }

  dispatch(setColumns(updatedColumns));
  socketSend(socket, updatedColumns);
}



const MoveButtons = () => {

  const dispatch = useDispatch();
  const { columns, socket } = useSelector(columnsState);

  return (
    <div className={styles.buttons}>
      <IconButton
        onClick={() => onButtonMove(columns, dispatch, setColumns, 'todo', socket)}
      >
        <ArrowBackIosNewIcon />
      </IconButton>
      <Button
        onClick={() => onNextTask(columns, dispatch, setColumns, socket)}
        variant='contained'
        sx={{backgroundColor: '#7D53DE'}}
      >
        Next task
      </Button>
      <IconButton
        onClick={() => onButtonMove(columns, dispatch, setColumns, 'todone', socket)}
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </div>
  )
}

export default MoveButtons;