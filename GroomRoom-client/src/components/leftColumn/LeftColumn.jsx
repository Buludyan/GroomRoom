import React from 'react';
import ToDoColumn from '../columnType/toDoColumn/ToDoColumn';
import { useDispatch, useSelector } from 'react-redux';
import { columnsState, setLeftOpen } from "../store/ColumnsSlice";
import styles from './LeftColumn.module.scss'
import { IconButton } from "@mui/material";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';


const LeftColumn = ({ provided, snapshot, column, name }) => {


  const dispatch = useDispatch();
  const { isLeftOpen, isMobile } = useSelector(columnsState);

  const cls = [styles.column];

  //cls.length = 1;

  if (!isLeftOpen.status) cls.push(styles.close);
  if (isLeftOpen.status && isMobile) cls[1] = styles.active;

  const onCloseMobLeft = () => {
    const udtLeft = {
      ...isLeftOpen,
      status: false,
  }
    dispatch(setLeftOpen(udtLeft));
  }

  return (
    <div
      className={cls.join(' ')}
    >
      {isMobile &&
        <IconButton
          onClick={onCloseMobLeft}
          className={styles.mobCloseButton}
        >
          <CancelOutlinedIcon
            sx={{
              fontSize: 30,
            }}
          />
        </IconButton>
      }
      {
        isLeftOpen.source === 'todos' ?
          <ToDoColumn
            provided={provided}
            snapshot={snapshot}
            column={column}
            name={name}
          />
          : isLeftOpen.source === 'menu' ?
            <h1
              style={{
                backgroundColor: '#D1F5FF',
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              Menu
            </h1>
            :
            <h1
              style={{
                backgroundColor: '#D1F5FF',
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              Users
            </h1>
      }
    </div>
  )
}

export default LeftColumn