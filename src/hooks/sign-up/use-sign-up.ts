"use client"
import { useToast } from "@/components/ui/use-toast"
import { UserRegistrationProps, UserRegistrationSchema } from "@/schemas/auth.schema";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {zodResolver} from '@hookform/resolvers/zod';
import { onCompleteUserRegistration } from "@/actions/auth";

export const useSignUpForm = () => {
    const {toast} = useToast();
    const [loading, setLoading] = useState<boolean>(false);
    const {signUp, isLoaded, setActive} = useSignUp();
    const router = useRouter();
    const methods = useForm<UserRegistrationProps>({
        resolver: zodResolver(UserRegistrationSchema),
        defaultValues: {
            type: 'owner',
        },
        mode: 'onChange',
    });

    //This is for generating OTP when user enters his/her info for signup
    const onGenerateOTP = async (
        email: string,
        password: string,
        onNext: React.Dispatch<React.SetStateAction<number>>
    ) => {
        try {
            if (!isLoaded) return
            await signUp.create({
                emailAddress: email,
                password: password
            });

            await signUp.prepareEmailAddressVerification({strategy: "email_code"})
            onNext((prev) => prev + 1);

        } catch (err: any) {
            console.log('OnGenerateOTP error', err);
            toast({
                title: 'Error generating OTP',
                description: err.errors[0].longMessage,
            });
        }
    }

    //Handle Submit method for register user info in our db.
    const onHandleSubmit = methods.handleSubmit(
        async (values: UserRegistrationProps) => {
            try {
                if (!isLoaded) return
                setLoading(true);
                const completeSignUp = await signUp.attemptEmailAddressVerification({
                    code: values.otp,
                })

                if (completeSignUp.status !== 'complete') {
                    return {message: 'Something went wrong'}
                }

                if (completeSignUp.status == 'complete') {
                    if (!signUp.createdUserId) return

                    const registered = await onCompleteUserRegistration(
                        signUp.createdUserId,
                        values.fullname,
                        values.type
                    )

                    if (registered?.status == 200 && registered.user) {
                        await setActive({
                            session: completeSignUp.createdSessionId,
                        })

                        setLoading(false);
                        router.push('/dashboard');
                    }

                    if (registered?.status == 400) {
                        toast({
                          title: 'Error',
                          description: 'Something went wrong!',
                        })
                    }
                }

            } catch (err: any) {
                console.log('handleSubmit error', err);
                toast({
                    title: 'User Registration Error',
                    description: err.errors[0].longMessage,
                })
            }
        }
    );

    return {
        onHandleSubmit,
        onGenerateOTP,
        loading,
        methods,
    }
}