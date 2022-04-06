import React from 'react'
import styles from './LeftOpenCloseBtn.module.scss'
import { IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { columnsState, setLeftOpen } from '../../store/ColumnsSlice';
import BallotIcon from '@mui/icons-material/Ballot';

const LeftOpenCloseBtn = () => {

    const { isMobile, isLeftOpen } = useSelector(columnsState)
    const dispatch = useDispatch();

    return (
        <div className={styles.nav}
            style={{
                right: !isLeftOpen && !isMobile && '19.9vw'
            }}
        >
            <IconButton
                onClick={() => dispatch(setLeftOpen())}
            >
                <BallotIcon />
            </IconButton>
        </div>
    )
}

export default LeftOpenCloseBtn;