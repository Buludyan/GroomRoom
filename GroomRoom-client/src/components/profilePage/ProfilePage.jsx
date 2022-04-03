import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { authState, logout } from '../store/AuthSlice';

const ProfilePage = () => {

    const [id, setId] = useState('');
    
    const dispatch = useDispatch();
    const { user } = useSelector(authState);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            width: '400px'
        }}>  
            <button onClick={() => dispatch(logout())} >Выйти</button>
            <NavLink to={`/${user.id}`}>Create room</NavLink>
            <input value={id} onChange={(e) => setId(e.target.value)}></input>
            <NavLink to={`/${id}`}>Join room</NavLink>
        </div>
    )
}

export default ProfilePage;