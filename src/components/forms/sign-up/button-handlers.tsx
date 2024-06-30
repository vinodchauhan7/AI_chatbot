'use client'
import { Button } from '@/components/ui/button';
import { useAuthContextHook } from '@/context/use-auth-context';
import { useSignUpForm } from '@/hooks/sign-up/use-sign-up';
import Link from 'next/link';
import React from 'react';
import { useFormContext } from 'react-hook-form';

const ButtonHandler = () => {
    const {currentStep, setCurrentStep} = useAuthContextHook();
    const {formState, getFieldState, getValues} = useFormContext();
    const {onGenerateOTP} = useSignUpForm();

    const {isDirty: isName} = getFieldState('fullname', formState);
    const {isDirty: isEmail} = getFieldState('email', formState);
    const {isDirty: isPassword} = getFieldState('password', formState);

    if (currentStep == 3) {
        return (
            <div className='w-full flex flex-col items-center gap-3'>
            <Button 
                type='submit'
                className='w-full bg-blue-950'
            >
                Create an account
            </Button>
            <p>
                Already have an account?{' '}
                <Link className='font-bold'
                    href='/auth/sign-in'
                >
                    Sign In
                </Link>
            </p>
        </div>
        )
    }

    if (currentStep == 2) {
        return (
            <div className='w-full flex flex-col items-center gap-3'>
            <Button 
                type='submit'
                className='w-full bg-blue-950'
                {...(isName &&
                    isEmail &&
                    isPassword && {
                      onClick: () =>
                        onGenerateOTP(
                          getValues('email'),
                          getValues('password'),
                          setCurrentStep
                        ),
                    })}
            >
                Continue
            </Button>
            <p>
                Already have an account?{' '}
                <Link className='font-bold'
                    href='/auth/sign-in'
                >
                    Sign In
                </Link>
            </p>
        </div>
        )
    }

    return (
        <div className='w-full flex flex-col items-center gap-3'>
            <Button 
                type='submit'
                className='w-full bg-blue-950'
                onClick={() => setCurrentStep((prev: number) => prev + 1)}
            >
                Continue
            </Button>
            <p>
                Already have an account?{' '}
                <Link className='font-bold'
                    href='/auth/sign-in'
                >
                    Sign In
                </Link>
            </p>
        </div>
    )
}

export default ButtonHandler;