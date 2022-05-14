import React, { useEffect, useState } from 'react';
import styles from './ProfilePage.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { roomService } from '../axios/service/roomService';
import { authState, logout } from '../store/AuthSlice';
import { columnsState } from '../store/ColumnsSlice';
import { Button, Divider, TextField } from '@mui/material';

const ProfilePage = () => {

    const [id, setId] = useState('');



    const dispatch = useDispatch();
    const { user } = useSelector(authState);
    const { roomId, clientId, socket } = useSelector(columnsState)

    const createRoomHandler = async () => {
        const room = await roomService.createRoom(user.id);
        if (room) window.location.href = `http://localhost:3000/${user.id}`;
    }

    const joinRoomHandler = async () => {
        const isRoom = await roomService.isRoom(id);
        if (!isRoom.data) {
            console.log('Нет комнаты')
        } else {
            return window.location.href = `http://localhost:3000/${id}`;
        }
    }

    useEffect(() => {
        socket && socket.send(JSON.stringify({
            method: "close",
            user,
            roomId,
            id: clientId
        }))
        socket && socket.close();
    }, [roomId, clientId, user, socket])

    return (
        <div className={styles.profilePage}>
            {!user.isActivated && <p>Пользователь не подтвердил аккаунт</p>}
            <div className={styles.roomEntry}>
                <Button
                    variant='contained'
                    onClick={createRoomHandler}
                    sx={{ height: '100%' }}
                >
                    Open room
                </Button>
                <Divider orientation="vertical" flexItem />
                <div className={styles.join}>
                    <Button variant='contained' onClick={joinRoomHandler}>Join room</Button>
                    <TextField
                        placeholder='Past here room ID'
                        value={id}
                        onChange={(e) =>
                            setId(e.target.value)}
                        size='small'
                    />
                </div>
            </div>
            <br />
            <Divider sx={{ width: '25%' }} />
            <br />
            <Button
                onClick={() => dispatch(logout())}
                variant='contained'
                sx={{ width: '25%' }}
                color='secondary'
            >
                Logout
            </Button>
        </div>
    )
}

export default ProfilePage;