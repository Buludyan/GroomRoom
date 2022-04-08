import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { columnsState, setLeftOpen } from "../../../store/ColumnsSlice";
import styles from './LeftColumn.module.scss'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import TodoList from './todoList/TodoList';
import NavBtns from './navBtns/NavBtns';
import { IconButton, Typography } from "@mui/material";

const LeftColumn = ({ provided, snapshot, column, name }) => {


  const dispatch = useDispatch();
  const { isLeftOpen, isMobile } = useSelector(columnsState);

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
        <NavBtns />
      </div>
      <TodoList
        provided={provided}
        column={column}
      />
    </div>
  )
}

export default LeftColumn