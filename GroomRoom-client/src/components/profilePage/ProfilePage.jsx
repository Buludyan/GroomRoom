import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { roomService } from '../axios/service/roomService';
import { authState, logout } from '../store/AuthSlice';

const ProfilePage = () => {

    const [id, setId] = useState('');
    
    const dispatch = useDispatch();
    const { user } = useSelector(authState);

    const createRoomHandler = async () => {
        const room = await roomService.createRoom(user.id);
        if(room) window.location.href = `http://localhost:3000/${user.id}`;
    }

    const joinRoomHandler = async () => {
        const isRoom = await roomService.isRoom(id);
        if(!isRoom.data) {
            console.log('Нет комнаты')
        } else {
            return window.location.href = `http://localhost:3000/${id}`;
        }
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            width: '400px'
        }}>  
            {!user.isActivated && 'Пользователь не подтвердил аккаунт'}
            <button onClick={() => dispatch(logout())} >Выйти</button>
            <button onClick={createRoomHandler}>Create room</button>
            <input value={id} onChange={(e) => setId(e.target.value)}></input>
            <button onClick={joinRoomHandler}>Join room</button>
        </div>
    )
}

export default ProfilePage;