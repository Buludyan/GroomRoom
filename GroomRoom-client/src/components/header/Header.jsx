import React from 'react';
import styles from './Header.module.scss';
import { IconButton, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <div className={styles.header}>
            <Typography variant='h4'>
                GroomRoom
            </Typography>
            <div className={styles.icon}>
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