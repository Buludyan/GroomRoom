import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import styles from './RegistrationMW.module.scss';
import { registration } from '../../store/AuthSlice';

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
                    <input
                        placeholder='email'
                        {...register('email', {
                            required: true,
                        })}
                    />
                    <input
                        placeholder='password'
                        type="password"
                        {...register('password', {
                            required: true,
                        })}
                    />
                    <input
                        placeholder='name'
                        {...register('name', {
                            required: true,
                        })}
                    />
                    <input
                        placeholder='surname'
                        {...register('surname', {
                            required: true,
                        })}
                    />
                    <button type='submit'>Registration</button>
                </form>
            </div>
        </div>
    )
}

export default RegistrationMW;