import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { columnsState, setLeftOpen } from "../../../store/ColumnsSlice";
import styles from './LeftColumn.module.scss'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import TodoList from './todoList/TodoList';
import { setIsActiveAdd } from '../../../store/AddEditMWSlice';
import { IconButton, Typography } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

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
        background: snapshot.isDraggingOver
          ? "lightblue"
          : "#D1F5FF",
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
        sx={{
          fontWeight: 700,
          fontSize: 30,
          pb: 2,
        }}
      >
        {name}
      </Typography>
      <IconButton
        className={styles.addButton}
        onClick={() => dispatch(setIsActiveAdd())}
      >
        <AddCircleOutlineIcon
          sx={{ fontSize: 35 }}
        />
      </IconButton>
      <TodoList
        provided={provided}
        column={column}
      />
    </div>
  )
}

export default LeftColumn