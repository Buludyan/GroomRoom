import { Button, Typography } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authState, logout } from '../../store/AuthSlice';
import { columnsState } from '../../store/ColumnsSlice';
import styles from './UserMW.module.scss';

const UserMW = ({ isUserMWOpen, setUserMWOpen }) => {

    const dispatch = useDispatch();
    const { user, isAuth } = useSelector(authState);
    const { socket, roomId, clientId } = useSelector(columnsState);

    const onLeaveHandler = () => {
        window.location.href = `http://localhost:3000/`;
        socket && socket.send(JSON.stringify({
            method: "close",
            user,
            roomId,
            id: clientId
        }))
        socket.close();
    }

    const onLogoutHandler = () => {
        window.location.href = `http://localhost:3000/login`;
        dispatch(logout());
    }

    return (
        <div
            className={isUserMWOpen
                ? styles.modalActive
                : styles.modal}
            onClick={() => setUserMWOpen(false)}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                {isAuth &&
                    <Typography variant='p' sx={{ color: '#000' }}>
                        {user.name} {user.surname}
                    </Typography>
                }
                <Button
                    variant='outlined'
                    onClick={onLeaveHandler}
                >
                    Leave room
                </Button>
                <Button
                    variant='outlined'
                >
                    Settings
                </Button>
                <Button
                    onClick={onLogoutHandler}
                >
                    Logout
                </Button>
            </div>
        </div>
    )
}

export default UserMW