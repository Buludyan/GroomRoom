import React from 'react'
import styles from './RightOpenCloseBtn.module.scss'
import { IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { columnsState, setRightOpen } from '../../../../store/ColumnsSlice';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

const RightOpenCloseBtn = () => {

    const { isMobile, isRightOpen } = useSelector(columnsState)
    const dispatch = useDispatch();

    return (
        <div className={styles.button}
            style={{
                left: !isRightOpen && !isMobile && '19.9vw'
            }}
        >
            <IconButton
                onClick={() => dispatch(setRightOpen())}
                size='small'
            >
                {isRightOpen ?
                    <KeyboardDoubleArrowRightIcon />
                    :
                    <KeyboardDoubleArrowLeftIcon />
                }
            </IconButton>
        </div>
    )
}

export default RightOpenCloseBtn;