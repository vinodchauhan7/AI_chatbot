"use server"

import { client } from "@/lib/prisma"

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