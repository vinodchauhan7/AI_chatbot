'use client'
import React from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import UserTypeCard from './user-type-card';

type Props = {
    register: UseFormRegister<FieldValues>
    userType: 'owner' | 'student'
    setUserType: React.Dispatch<React.SetStateAction<'owner' | 'student'>>
}

const TypeSelectionForm = ({
    register,
    userType,
    setUserType
}: Props) => {
    return (
        <div>
            <h2 className='text-gravel md:text-4xl font-bold'>
                Create an account
            </h2>
            {/* <p className='text-iridium md:text-sm font-bold pt-3'>
                Give some details about yourself
            </p> */}
            
                <UserTypeCard 
                    register={register}
                    userType={userType}
                    setUserType={setUserType}
                    value='owner'
                    title='I own a business'
                    text='Setting up my account for my company.'
                />
                <UserTypeCard 
                    register={register}
                    userType={userType}
                    setUserType={setUserType}
                    value='student'
                    title='I am a student'
                    text='Looking to learn about the tool.'
                />
            
        </div>
    )
}

export default TypeSelectionForm;