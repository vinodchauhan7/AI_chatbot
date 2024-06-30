'use client'

import { onGetConversationMode, onToggleRealtime } from '@/actions/conversation';
import { useToast } from '@/components/ui/use-toast';
import { useChatContext } from '@/context/user-chat-context';
import { useClerk } from '@clerk/nextjs';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react'

const useSideBar = () => {
    const [expand, setExpand] = useState<undefined | boolean>(undefined);
    const [loading, setLoading] = useState<boolean>(false);
    const [realtime, setRealtime] = useState<boolean>(false);
    const router = useRouter();
    const pathName = usePathname();
    const {toast} = useToast();

    const {chatRoom} = useChatContext();

    //activate real time tag
    const onActivateRealtime = async (e: any) => {
        try {
            const realTime = await onToggleRealtime(
                chatRoom!,
                e.target.ariaChecked == 'true' ? false : true
            )

            if(realTime) {
                setRealtime(realTime.chatRoom.live);
                toast({
                    title: 'Success',
                    description: realTime.message,
                })
            }
        } catch (err) {
            console.log('onActivateRealTime error ', err);
        }
    }

    const onGetCurrentMode = async () => {
        setLoading(true);
        const mode = await onGetConversationMode(chatRoom!);
        if (mode) {
            setRealtime(mode.live);
            setLoading(false)
        }
    }

    useEffect(() => {
        if (chatRoom) {
            onGetCurrentMode();
        }
    }, [chatRoom]);

    const page = pathName.split('/').pop();
    const { signOut} = useClerk();

    const onSignOut = () => signOut(() => router.push('/'))

    const onExpand = () => setExpand((prev) => !prev)
  
    return {
      expand,
      onExpand,
      page,
      onSignOut,
      realtime,
      onActivateRealtime,
      chatRoom,
      loading,
    }
}

export default useSideBar;