import React from 'react'
import styles from './LeftOpenCloseBtn.module.scss'
import { IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { columnsState, setLeftOpen } from '../../../../store/ColumnsSlice';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

const LeftOpenCloseBtn = () => {

    const { isMobile, isLeftOpen } = useSelector(columnsState)
    const dispatch = useDispatch();

    return (
        <div className={styles.button}
            style={{
                right: !isLeftOpen && !isMobile && '19.9vw'
            }}
        >
            <IconButton
                onClick={() => dispatch(setLeftOpen())}
                size='small'
            >
                {isLeftOpen ?
                    <KeyboardDoubleArrowLeftIcon />
                    :
                    <KeyboardDoubleArrowRightIcon />
                }
            </IconButton>
        </div>
    )
}

export default LeftOpenCloseBtn;