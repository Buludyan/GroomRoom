import React from 'react';
import styles from './Header.module.scss';
import { IconButton, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { columnsState } from '../store/ColumnsSlice';
import { authState } from '../store/AuthSlice';

const Header = () => {

    const { user } = useSelector(authState);
    const { socket, roomId, clientId } = useSelector(columnsState);

    const onBackHandler = () => {
        socket && socket.send(JSON.stringify({
            method: "close",
            user,
            roomId,
            id: clientId
        }))
        socket.close();
    }

    return (
        <div className={styles.header}>
            <Typography variant='h4'>
                GroomRoom
            </Typography>
            <div 
                className={styles.icon}
                onClick={onBackHandler}
            >
                <NavLink to='/'>
                    <IconButton
                        sx={{ color: '#000' }}
                    >
                        <AccountCircleIcon
                            sx={{ fontSize: '40px' }}
                        />
                    </IconButton>

                </NavLink>
            </div>
        </div>
    )
}

export default Header