import React from 'react'
import styles from './LeftNavBar.module.scss'
import { IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { columnsState, setLeftOpen } from '../../store/ColumnsSlice';
import MenuIcon from '@mui/icons-material/Menu';
import GroupIcon from '@mui/icons-material/Group';
import BallotIcon from '@mui/icons-material/Ballot';

const LeftNavBar = () => {

    const { isMobile, isLeftOpen } = useSelector(columnsState)
    const dispatch = useDispatch();

    const onLeftOpen = (source) => {
        const udtLeft = {
            ...isLeftOpen,
            status: isLeftOpen.source === source ? !isLeftOpen.status : true,
            source: source
        }
        dispatch(setLeftOpen(udtLeft));
    }


    return (
        <div className={styles.nav}
            style={{
                right: !isLeftOpen.status && !isMobile && '19.9vw'
            }}
        >
            <IconButton
                onClick={() => onLeftOpen('menu')}
            >
                <MenuIcon />
            </IconButton>
            <IconButton
                onClick={() => onLeftOpen('todos')}
            >
                <BallotIcon />
            </IconButton>
            <IconButton
                onClick={() => onLeftOpen('users')}
            >
                <GroupIcon />
            </IconButton>
        </div>
    )
}

export default LeftNavBar