import SignInFormProvider from '@/components/forms/sign-in/form-provider';
import LoginForm from '@/components/forms/sign-in/login-form';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

type Props = {};

const SignIn = (props: Props) => {
    return (
        <div className='flex-1 pt-20 w-full md:px-16'>
            <div className='flex flex-col gap-3 justify-center'>
            <SignInFormProvider>
                <LoginForm />
                <div className='flex flex-col items-center gap-3'>
                    <Button type='submit' className='w-full bg-blue-950'>
                        Sign In
                    </Button>
                    <p>
                        Don’t have an account?{' '}
                        <Link
                            href="/auth/sign-up"
                            className="font-bold"
                        >
                        Create one
                        </Link>
                    </p>
                </div>
            </SignInFormProvider>
            </div>
            
        </div>
    )
};

export default SignIn;