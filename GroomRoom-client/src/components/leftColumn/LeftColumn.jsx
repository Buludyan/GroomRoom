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

  if (!isLeftOpen) cls.push(styles.close);
  if (isLeftOpen && isMobile) cls[1] = styles.active;

  return (
    <div
      className={cls.join(' ')}
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

      <ToDoColumn
        provided={provided}
        snapshot={snapshot}
        column={column}
        name={name}
      />

    </div>
  )
}

export default LeftColumn