'use client'

import { useAuthContextHook } from '@/context/use-auth-context';
import { cn } from '@/lib/utils';
import React from 'react';

const HighLightBar = () => {
    const {currentStep} = useAuthContextHook();
    return (
        <div className="grid grid-cols-3 gap-3">
            <div className={cn(
                currentStep == 1 ? 'bg-blue-950' : 'bg-platinum',
                'rounded-full h-2 col-span-1'
            )}>

            </div>
            <div className={cn(
                currentStep == 2 ? 'bg-blue-950' : 'bg-platinum',
                'rounded-full h-2 col-span-1'
            )}>

            </div>
            <div className={cn(
                currentStep == 3 ? 'bg-blue-950' : 'bg-platinum',
                'rounded-full h-2 col-span-1'
            )}>

            </div>
        </div>
    )
}

export default HighLightBar;