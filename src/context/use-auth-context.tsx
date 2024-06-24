"use client"
import React, { useContext, useState } from 'react';

type InitialValues = {
    currentStep: number
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>
}

const InitialValues: InitialValues = {
    currentStep: 1,
    setCurrentStep: () => undefined
}

const authContext = React.createContext(InitialValues);

const {Provider} = authContext;

export const AuthContextProvider = ({children}: {
    children: React.ReactNode
}) => {
    const [currentStep, setCurrentStep] = useState<number>(InitialValues.currentStep);
    const values = {
        currentStep,
        setCurrentStep
    }

    return <Provider value={values}>{children}</Provider>
};

export const useAuthContextHook = () => {
    const state = useContext(authContext);
    return state;
}