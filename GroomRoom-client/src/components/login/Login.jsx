import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import RegistrationMW from '../modalWindow/registrationMW/RegistrationMW';
import { login } from '../store/AuthSlice';

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
        } catch(e) {
            console.log(e)
        }

    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    {...register('email', {
                        required: true,
                    })}
                />
                <input
                    type="password"
                    {...register('password', {
                        required: true,
                    })}
                />
                <button type='submit'>Login</button>
            </form>
            <button onClick={() => setRegMWOpen(true)}>Create new account</button>
            <RegistrationMW 
                isRegMWOpen={isRegMWOpen}
                setRegMWOpen={setRegMWOpen}
            />
        </div>
    )
}

export default Login