import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { columnsState } from '../../store/ColumnsSlice';
import styles from './DragCard.module.scss';
import { setIsActiveEdit } from '../../store/AddEditMWSlice';
import { IconButton, Typography } from "@mui/material";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import LinkIcon from '@mui/icons-material/Link';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { authState } from '../../store/AuthSlice';
import { setActive, setData } from '../../store/DeleteMWSlice';
import { setDescData, setDescMWActive } from '../../store/DescriptionMWSlice';

const DragCard = ({ provided, snapshot, column, item }) => {

    const dispatch = useDispatch();
    const { user } = useSelector(authState);
    const { adminId } = useSelector(columnsState);

    const onDeleteHandler = () => {
        dispatch(setData({ column, item }));
        dispatch(setActive({ isActive: true, isAllActive: false }));
    }

    const onDescriptionHanler = () => {
        dispatch(setDescMWActive(true));
        dispatch(setDescData({ description: item.description, name: item.content }));
    }

    const onItemEdit = () => {
        dispatch(setIsActiveEdit({
            columnName: column.name,
            name: item.content,
            description: item.description,
            id: item.id
        }))
    }

    return (
        <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={
                snapshot.isDragging ?
                    styles.draggingCard
                    :
                    styles.card
            }
            style={{
                ...provided.draggableProps.style,
                backgroundColor: snapshot.isDragging && "#263B4A"
            }}
        >
            <div className={styles.cardHeader}>
                <Typography
                    component='p'
                    sx={{ fontSize: 20 }}
                >
                    {item.content}
                </Typography>
                {user.id === adminId &&
                    <div className={styles.buttons}>
                        <IconButton
                            onClick={() => onItemEdit()}
                        >
                            <EditOutlinedIcon
                                sx={{ color: '#000' }}
                            />
                        </IconButton>
                        <IconButton
                            onClick={onDeleteHandler}
                        >
                            <DeleteOutlinedIcon
                                sx={{ color: '#000' }}
                            />
                        </IconButton>
                    </div>
                }
            </div>
            <div className={styles.descriptionBlock}>
                <Typography
                    className={styles.description}
                >
                    {item.description}
                </Typography>
                <Typography
                    variant='p'
                    className={styles.more}
                    onClick={onDescriptionHanler}
                >
                    ...see more
                </Typography>
            </div>
            <div className={styles.cardFooter}>
                {column.name === 'Done' ?
                    <p
                        className={styles.value}
                    >
                        {item.value}
                    </p>
                    :
                    <p></p>
                }
                <IconButton
                    className={styles.link}
                    href="https://www.abc.xyz"
                    target="_blank"
                    rel="noreferrer"
                >
                    <LinkIcon />
                </IconButton>
            </div>
        </div >
    )
}

export default DragCard