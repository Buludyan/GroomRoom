import React, { useEffect, useState } from 'react';
import styles from './ProfilePage.module.scss';
import { useSelector } from 'react-redux';
import { roomService } from '../axios/service/roomService';
import { authState } from '../store/AuthSlice';
import { columnsState } from '../store/ColumnsSlice';
import { Button, Divider, TextField } from '@mui/material';

const ProfilePage = () => {

    const [id, setId] = useState('');
    const { user, isAuth } = useSelector(authState);
    const { roomId, clientId, socket } = useSelector(columnsState);

    console.log(isAuth)

    const createRoomHandler = async () => {
        if (!isAuth) return window.location.href = `http://68.183.7.78:3000/login`;
        const room = await roomService.createRoom(user.id);
        if (room) window.location.href = `http://68.183.7.78:3000/${user.id}`;
    }

    const joinRoomHandler = async () => {
        if (!isAuth) return window.location.href = `http://68.183.7.78:3000/login`;
        const isRoom = await roomService.isRoom(id);
        if (!isRoom.data) {
            console.log('Нет комнаты')
        } else {
            return window.location.href = `http://68.183.7.78:3000/${id}`;
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
            {!user.isActivated && isAuth && <p>Пользователь не подтвердил аккаунт</p>}
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
                        placeholder='Paste here room ID'
                        value={id}
                        onChange={(e) =>
                            setId(e.target.value)}
                        size='small'
                    />
                </div>
            </div>
        </div>
    )
}

export default ProfilePage;