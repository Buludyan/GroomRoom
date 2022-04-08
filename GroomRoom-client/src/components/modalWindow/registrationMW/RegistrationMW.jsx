import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import styles from './RegistrationMW.module.scss';
import { registration } from '../../store/AuthSlice';
import { Button, TextField } from '@mui/material';

const RegistrationMW = ({ isRegMWOpen, setRegMWOpen }) => {

    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        reset
    } = useForm()

    const onSubmit = async (data) => {
        reset()
        dispatch(registration(data))
    }

    return (
        <div
            className={isRegMWOpen
                ? styles.modalActive
                : styles.modal}
            onClick={() => setRegMWOpen(false)}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <form
                    className={styles.form}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <TextField
                        label='Email'
                        {...register('email', {
                            required: true,
                        })}
                    />
                    <br/>
                    <TextField
                        label='Password'
                        type="password"
                        {...register('password', {
                            required: true,
                        })}
                    />
                    <br/>
                    <TextField
                        label='Name'
                        {...register('name', {
                            required: true,
                        })}
                    />
                    <br/>
                    <TextField
                        label='Surname'
                        {...register('surname', {
                            required: true,
                        })}
                    />
                    <br/>
                    <Button variant='contained' type='submit'>Registration</Button>
                </form>
            </div>
        </div>
    )
}

export default RegistrationMW;