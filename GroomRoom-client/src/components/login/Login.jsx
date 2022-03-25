import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import RegistrationMW from '../modalWindow/registrationMW/RegistrationMW';

const Login = () => {

    const [isRegMWOpen, setRegMWOpen] = useState(false);

    const {
        register,
        handleSubmit,
        reset
    } = useForm({
        mode: 'onBlur'
    });

    const onSubmit = (data) => {
        console.log(JSON.stringify(data));
        reset()
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