import React from 'react';
import styles from './RightColumn.module.scss'
import { useSelector } from "react-redux";
import { columnsState, setRightOpen } from "../../../store/ColumnsSlice";
import { useDispatch } from 'react-redux';
import { Divider, IconButton } from '@mui/material';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import DoneList from './doneList/DoneList';
import { Typography } from "@mui/material";

const RightColumn = ({ provided, snapshot, column, name }) => {

    const dispatch = useDispatch();
    const { isRightOpen, isMobile } = useSelector(columnsState);

    const cls = [styles.column];

    if (!isRightOpen) cls.push(styles.close);
    if (isRightOpen && isMobile) cls[1] = styles.active;

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
            <Divider style={{width:'90%', zIndex: '2', marginTop: '50px', marginBottom: '12px'}} />
            <DoneList
                provided={provided}
                column={column}
            />
        </div>
    )
}

export default RightColumn;