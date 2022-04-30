import React from 'react';
import styles from './RightColumn.module.scss'
import { useSelector } from "react-redux";
import { columnsState, setRightOpen } from "../../../store/ColumnsSlice";
import { useDispatch } from 'react-redux';
import { Divider, IconButton } from '@mui/material';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import DoneList from './doneList/DoneList';
import { Typography } from "@mui/material";
import { authState } from '../../../store/AuthSlice';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import { setActive, setData } from '../../../store/DeleteMWSlice';

const RightColumn = ({ provided, snapshot, column, name }) => {

    const dispatch = useDispatch();
    const { user } = useSelector(authState);
    const { isRightOpen, isMobile, adminId } = useSelector(columnsState);

    const cls = [styles.column];

    if (!isRightOpen) cls.push(styles.close);
    if (isRightOpen && isMobile) cls[1] = styles.active;

    const onDeleteAllItems = () => {
        dispatch(setActive({ isActive: true, isAllDelete: true }));
        dispatch(setData({ column, item: null }));
    }

    return (
        <div
            className={cls.join(' ')}
            style={{
                background: snapshot.isDraggingOver && "lightblue"
            }}
        >
            {isMobile &&
                <IconButton
                    onClick={() => dispatch(setRightOpen())}
                    className={styles.mobCloseButton}
                >
                    <CancelOutlinedIcon
                        sx={{ fontSize: 30 }}
                    />
                </IconButton>
            }
            <Typography
                variant='h4'
            >
                {name}
            </Typography>
            <div className={styles.nav}>
                {user.id === adminId &&
                    <IconButton
                        onClick={onDeleteAllItems}
                    >
                        <DeleteSweepIcon
                            sx={{ fontSize: 33 }}
                        />
                    </IconButton>
                }
            </div>
            <Divider style={{
                width: '90%',
                zIndex: '2',
                marginBottom: '12px'
            }}
            />
            <DoneList
                provided={provided}
                column={column}
            />
        </div>
    )
}

export default RightColumn;