'use client'

import React from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import FormGenerator from '../form-generator';

type Props = {
    name: string
    register: UseFormRegister<FieldValues> 
    errors: FieldErrors<FieldValues>
}

const DomainUpdate = ({
    name,
    register,
    errors
}: Props) => {
    return (
        <div className='flex gap-2 pt-5 w-[400px]'>
            <FormGenerator 
                inputType='input'
                type='text'
                name={name}
                register={register}
                errors={errors}
                placeholder={name}
                label="Domain Name"
            />
        </div>
    )
}

export default DomainUpdate