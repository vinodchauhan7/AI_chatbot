import { currentUser } from '@clerk/nextjs';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React from 'react';

type Props = {
    children: React.ReactNode
};

const Layout = async ({children} : Props) => {
    const user = await currentUser();
    if (user) redirect('/');

    return (
        <>
            <div className='h-screen flex w-full justify-center'>
                <div className='ld:w-full w-[600px] flex flex-col items-start p-6'>
                    <Image 
                        src={"/images/logo.png"}
                        alt='Logo'
                        sizes='100vw'
                        style={{
                            width: '20%',
                            height: 'auto'
                        }}
                        width={0}
                        height={0}
                    />
                    <div>
                        {children}
                    </div>
                </div>
                <div className='hidden overflow-hidden lg:flex flex-1 w-full max-h-full max-w-4000px relative bg-blue-950 flex-col pt-10 pl-24 gap-3'>
                    <h2 className='text-white md:text-2xl font-bold'>
                        Unleash the power of AI Chatbot in sales assistant
                    </h2>
                    <p className='text-cream md:text-sm mb-10'>
                        Get started with our AI-powered sales assistant to automate your sales process and boost conversions with email marketing...{''}
                        <br/>
                        something never seen before.
                    </p>
                    <Image
                        src="/images/app-ui-2.png"
                        alt="app image"
                        loading="lazy"
                        sizes="30"
                        className="absolute shrink-0 !w-[600px] top-40"
                        width={0}
                        height={0}
                    />
                </div>
            </div>
        </>
    )
}

export default Layout;