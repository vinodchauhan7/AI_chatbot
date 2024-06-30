"use server"

import { client } from "@/lib/prisma"
import { currentUser, redirectToSignIn } from "@clerk/nextjs"
import { onGetAllAccountDomain } from "../settings"

export const onCompleteUserRegistration = async (
    clerkId: string,
    fullname: string,
    type: string,
) => {
    try {
        // Send a request to your server to complete the user registration
        const createUser = await client.user.create({
            data: {
                clerkId,
                fullname,
                type,
                subscription: {
                    create: {}
                },
            },
            select: {
                fullname: true,
                id: true,
                type: true,
            },
        })

        if (createUser) {
            return {status: 200, user: createUser}
        }

    } catch (err) {
        return {
            status: 400,
            message: `Error got ${err}`
        }
    }
}

export const onLoginUser = async() => {
    try {
        const user = await currentUser();
        if (!user) redirectToSignIn();
        const getUser = await client.user.findUnique({
            where: {
                clerkId: user?.id,
            },
            select: {
                fullname: true,
                id: true,
                type: true,
            },
        });
        if (getUser) {
            const domain = await onGetAllAccountDomain();
            return {status: 200, user: getUser, domain: domain?.domains}
        }
        
    } catch (err) {
        console.log('OnLoginUser error ', err);
        return {status: 400, error: err};
    }
}