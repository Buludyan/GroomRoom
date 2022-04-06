import React from 'react'
import styles from './RightOpenCloseBtn.module.scss'
import { IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { columnsState, setRightOpen } from '../../../../store/ColumnsSlice';
import BallotIcon from '@mui/icons-material/Ballot';

const RightOpenCloseBtn = () => {

    const { isMobile, isRightOpen } = useSelector(columnsState)
    const dispatch = useDispatch();

    return (
        <div className={styles.nav}
            style={{
                left: !isRightOpen && !isMobile && '19.9vw'
            }}
        >
            <IconButton
                onClick={() => dispatch(setRightOpen())}
            >
                <BallotIcon />
            </IconButton>
        </div>
    )
}

export default RightOpenCloseBtn;