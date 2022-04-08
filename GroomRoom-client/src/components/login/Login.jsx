import React, { useState } from 'react';
import styles from './Login.module.scss';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import RegistrationMW from '../modalWindow/registrationMW/RegistrationMW';
import { login } from '../store/AuthSlice';
import { Button, Divider, Paper, TextField, Typography } from '@mui/material';

const Login = () => {

    const dispatch = useDispatch();

    const [isRegMWOpen, setRegMWOpen] = useState(false);

    const {
        register,
        handleSubmit,
        reset
    } = useForm({
        mode: 'onBlur'
    });

    const onSubmit = async (data) => {
        try {
            reset()
            dispatch(login(data))
        } catch (e) {
            console.log(e)
        }

    }

    return (
        <div className={styles.login}>
            <Paper className={styles.frame} elevation={10}>
            <div className={styles.content}>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className={styles.form}
                >
                    <br />
                    <TextField
                        variant='outlined'
                        label='Login'
                        {...register('email', {
                            required: true,
                        })}
                    />
                    <br />
                    <TextField
                        variant='outlined'
                        label='Password'
                        type="password"
                        {...register('password', {
                            required: true,
                        })}
                    />
                    <br />
                    <Button variant='contained' type='submit'>Login</Button>
                </form>
                <Divider style={{width:'100%', zIndex: '10'}} />
                <Button
                    onClick={() => setRegMWOpen(true)}
                    variant='contained'
                    style={{ background: '#0aba18'}}
                >
                    Create new account
                </Button>
            </div>
            <RegistrationMW
                isRegMWOpen={isRegMWOpen}
                setRegMWOpen={setRegMWOpen}
            />
             </Paper>
        </div>
    )
}

export default Login