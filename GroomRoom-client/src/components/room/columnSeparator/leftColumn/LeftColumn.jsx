import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { columnsState, setLeftOpen } from "../../../store/ColumnsSlice";
import styles from './LeftColumn.module.scss'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import NavBtns from './navBtns/NavBtns';
import { Divider, IconButton, Typography } from "@mui/material";
import { authState } from '../../../store/AuthSlice';
import { Draggable } from 'react-beautiful-dnd';
import DragCard from '../../../cards/dragCard/DragCard';

const LeftColumn = ({ provided, snapshot, column, name }) => {

  const dispatch = useDispatch();
  const { user } = useSelector(authState);
  const { isLeftOpen, isMobile, adminId } = useSelector(columnsState);

  const cls = [styles.todo];

  if (!isLeftOpen) cls.push(styles.close);
  if (isLeftOpen && isMobile) cls[1] = styles.active;

  return (
    <div
      className={cls.join(' ')}
      style={{
        background: snapshot.isDraggingOver && "lightblue"
      }}
    >
      <div className={styles.todo__inner}>
        {isMobile &&
          <IconButton
            onClick={() => dispatch(setLeftOpen())}
            className={styles.todo__mobCloseButton}
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
        <div className={styles.todo__nav}>
          {user.id === adminId && <NavBtns column={column} />}
        </div>
        <Divider style={{ width: '90%', zIndex: '2', marginBottom: '7px' }} />
        <div
          className={styles.todo__todoList}
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {column.items.map((item, index) => {
            return (
              <Draggable
                key={item.id}
                draggableId={item.id}
                index={index}
              >
                {(provided, snapshot) => {
                  return (
                    <DragCard
                      provided={provided}
                      snapshot={snapshot}
                      column={column}
                      item={item}
                    />
                  );
                }}
              </Draggable>
            );
          })}
          {provided.placeholder}
        </div>
      </div>
    </div>
  )
}

export default LeftColumn