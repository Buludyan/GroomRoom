import React, { useState } from 'react';
import styles from './Header.module.scss';
import { IconButton, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authState } from '../store/AuthSlice';
import UserMW from '../modalWindow/userMW/UserMW';

const Header = () => {

    const { user, isAuth } = useSelector(authState);
    const [isUserMWOpen, setUserMWOpen] = useState(false);

    return (
        <div className={styles.header}>
            <Typography variant='h5' sx={{ color: '#fff', ml: '10px' }}>
                GroomRoom
            </Typography>
            <div className={styles.info}>
                {
                    isAuth ?
                        <Typography variant='p' sx={{ color: '#fff' }}>
                            {user.name} {user.surname}
                        </Typography>
                        :
                        <NavLink to='/login'>
                            <Typography >
                                Login
                            </Typography>
                        </NavLink>
                }
                <div
                    onClick={() => setUserMWOpen(true)}
                >
                    <IconButton
                    >
                        <AccountCircleIcon
                            sx={{ fontSize: '30px', color: '#fff' }}
                        />
                    </IconButton>
                </div>
            </div>
            <UserMW
                isUserMWOpen={isUserMWOpen}
                setUserMWOpen={setUserMWOpen}
            />
        </div>
    )
}

export default Header