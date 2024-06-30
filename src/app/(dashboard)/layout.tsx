import { onLoginUser } from '@/actions/auth';
import SideBar from '@/components/side-bar';
import { ChatProvider } from '@/context/user-chat-context';
import React from 'react';

type Props = {
    children: React.ReactNode
}

const Layout = async ({
    children 
}: Props) => {
    const authenticatedUser = await onLoginUser();
    if (authenticatedUser?.status == 400) return null;
    return (
        <ChatProvider>
            <div className='flex w-full h-screen'>
                <SideBar domains={authenticatedUser?.domain} />
                <div className='flex flex-col w-full h-screen pl-20 md:pl-4'>
                    {children}
                </div>
            </div>
        </ChatProvider>
    );
}

export default Layout