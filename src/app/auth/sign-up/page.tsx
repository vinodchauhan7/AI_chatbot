import ButtonHandler from '@/components/forms/sign-up/button-handlers';
import SignUpFormProvider from '@/components/forms/sign-up/form-provider';
import HighLightBar from '@/components/forms/sign-up/highlight-bar';
import RegistrationStep from '@/components/forms/sign-up/registration-step';
import React from 'react';

type Props = {};

const SignUp = (props: Props) => {
    return (
        <div className='flex-1 pt-20 md:px-16 w-full'>
            <div className='flex flex-col h-full gap-3'>
                <SignUpFormProvider>
                    <div className='flex flex-col gap-3'>
                        <RegistrationStep />
                        <ButtonHandler />
                    </div>
                    <HighLightBar />
                </SignUpFormProvider>
            </div>
        </div>
    )
};

export default SignUp;