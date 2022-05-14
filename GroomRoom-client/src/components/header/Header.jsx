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
            <Typography variant='h5' sx={{ color: '#fff', ml: '10px' }}>
                GroomRoom
            </Typography>
            <div className={styles.info}>
                <Typography variant='p' sx={{ color: '#fff' }}>
                    {user.name} {user.surname}
                </Typography>
                <div
                    onClick={onBackHandler}
                >
                    <NavLink to='/'>
                        <IconButton
                        >
                            <AccountCircleIcon
                                sx={{ fontSize: '30px', color: '#fff' }}
                            />
                        </IconButton>

                    </NavLink>
                </div>
            </div>

        </div>
    )
}

export default Header