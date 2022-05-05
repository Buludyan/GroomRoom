import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { columnsState, setLeftOpen } from "../../../store/ColumnsSlice";
import styles from './LeftColumn.module.scss'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import TodoList from './todoList/TodoList';
import NavBtns from './navBtns/NavBtns';
import { Divider, IconButton, Typography } from "@mui/material";
import { authState } from '../../../store/AuthSlice';

const LeftColumn = ({ provided, snapshot, column, name }) => {


  const dispatch = useDispatch();
  const { user } = useSelector(authState);
  const { isLeftOpen, isMobile, adminId } = useSelector(columnsState);

  const cls = [styles.column];

  if (!isLeftOpen) cls.push(styles.close);
  if (isLeftOpen && isMobile) cls[1] = styles.active;

  return (
    <div
      className={cls.join(' ')}
      style={{
        background: snapshot.isDraggingOver && "lightblue"
      }}
    >
      {isMobile &&
        <IconButton
          onClick={() => dispatch(setLeftOpen())}
          className={styles.mobCloseButton}
        >
          <CancelOutlinedIcon
            sx={{
              fontSize: 30,
            }}
          />
        </IconButton>
      }
      <Typography
        variant='h4'
      >
        {name}
      </Typography>
      <div className={styles.nav}>
        {user.id === adminId && <NavBtns column={column}/>}
      </div>
      <Divider style={{width:'90%', zIndex: '2', marginBottom: '12px'}}/>
      <TodoList
        provided={user.id === adminId ? provided : {}}
        column={column}
      />
    </div>
  )
}

export default LeftColumn