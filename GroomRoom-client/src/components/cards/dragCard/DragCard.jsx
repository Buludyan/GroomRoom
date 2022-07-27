import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { columnsState } from "../../store/ColumnsSlice";
import styles from "./DragCard.module.scss";
import { setIsActiveEdit } from "../../store/AddEditMWSlice";
import { IconButton, Typography } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import LinkIcon from "@mui/icons-material/Link";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { authState } from "../../store/AuthSlice";
import { setActive, setData } from "../../store/DeleteMWSlice";
import { setDescData, setDescMWActive } from "../../store/DescriptionMWSlice";

const DragCard = ({ provided, snapshot, column, item }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(authState);
  const { adminId } = useSelector(columnsState);

  const onDeleteHandler = () => {
    dispatch(setData({ column, item }));
    dispatch(setActive({ isActive: true, isAllActive: false }));
  };

  const onDescriptionHanler = () => {
    dispatch(setDescMWActive(true));
    dispatch(
      setDescData({
        description: item.description,
        name: item.content,
        link: item.link,
      })
    );
  };

  const onItemEdit = () => {
    dispatch(
      setIsActiveEdit({
        columnName: column.name,
        name: item.content,
        description: item.description,
        link: item.link,
        id: item.id,
      })
    );
  };

  const getStyle = (style, snapshot) => {
    if (!snapshot.isDropAnimating || snapshot.draggingOver !== "2") {
      return style;
    }

    return {
      ...style,
      transitionDuration: `0.001s`,
    };
  };

  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className={snapshot.isDragging ? styles.draggingCard : styles.card}
      style={{
        ...getStyle(provided.draggableProps.style, snapshot),
        backgroundColor: snapshot.isDragging && "#263B4A",
        direction: snapshot.isDragging && column.name === "Done" && "ltr",
      }}
    >
      <div className={styles.cardHeader}>
        <div className={styles.name}>
          <Typography
            component="p"
            sx={{
              fontFamily: "Montserrat",
              fontSize: 20,
            }}
          >
            {item.content}
          </Typography>
        </div>
        {user.id === adminId && (
          <div className={styles.buttons}>
            <IconButton onClick={() => onItemEdit()}>
              <EditOutlinedIcon sx={{ color: "#000" }} />
            </IconButton>
            <IconButton onClick={onDeleteHandler}>
              <DeleteOutlinedIcon sx={{ color: "#000" }} />
            </IconButton>
          </div>
        )}
      </div>
      <div className={styles.descriptionBlock}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            width: '70%'
          }}
        >
          <Typography
            className={styles.description}
            sx={{
              fontFamily: "Montserrat",
            }}
          >
            {item.description}
          </Typography>
          <span className={styles.dots}>...</span>
        </div>
        <Typography
          variant="p"
          className={styles.more}
          onClick={onDescriptionHanler}
        >
          see more
        </Typography>
      </div>
      <div className={styles.cardFooter}>
        {column.name === "Done" ? (
          <p className={styles.value}>{item.value}</p>
        ) : (
          <p></p>
        )}
        {item.link && (
          <IconButton
            className={styles.link}
            href={item.link}
            target="_blank"
            rel="noreferrer"
          >
            <LinkIcon />
          </IconButton>
        )}
      </div>
    </div>
  );
};

export default DragCard;
