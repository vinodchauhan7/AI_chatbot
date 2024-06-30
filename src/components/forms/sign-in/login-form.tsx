'use client'

import { USER_LOGIN_FORM } from '@/constants/forms';
import React from 'react';
import FormGenerator from '../form-generator';
import { useFormContext } from 'react-hook-form';

const LoginForm = () => {
    const {register, formState: {errors}} = useFormContext();
    return (
        <>
            <h2 className='text-gravel md:text-2xl font-bold'>
                Login
            </h2>
            {
                USER_LOGIN_FORM.map((field) => (
                    <FormGenerator 
                        key={field.id}
                        {...field}
                        register={register}
                        errors={errors}
                        name={field.name}
                    />
                ))
            }
        </>
    )
}

export default LoginForm;