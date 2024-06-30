import { onAiChatBotAssistant, onGetCurrentChatBot } from "@/actions/chatbot"
import { useChatContext } from "@/context/user-chat-context"
import { postToParent } from "@/lib/utils"
import { ChatBotMessageProps, ChatBotMessageSchema } from "@/schemas/conversation.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { UploadClient } from '@uploadcare/upload-client'
import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
const upload = new UploadClient({
    publicKey: process.env.NEXT_PUBLIC_UPLOAD_CARE_PUBLIC_KEY as string,
  })

export const useChatBot = () => {
    const {register, reset, formState: {errors}, handleSubmit } = useForm<ChatBotMessageProps>({
        resolver: zodResolver(ChatBotMessageSchema)
    })

    const [currentBot, setCurrentBot] = useState<
    {
        name: string
        chatBot: {
            id: string
            icon: string | null
            welcomeMessage: string | null
            background: string | null
            textColor: string | null
            helpdesk: boolean
            bot_name: string | null
        } | null
        helpdesk: {
            id: string
            question: string
            answer: string
            domainId: string | null 
        }[]
    } | undefined
    >()

    const messageRefWindow = useRef<HTMLDivElement | null>(null);
    const [botOpened, setBotOpened] = useState<boolean>(false)
    const onOpenChatBot = () => setBotOpened(prev => !prev)
    const [loading, setLoading] = useState<boolean>(true)
    const [onChats, setOnChats] = useState<
        {role: 'assistant' | 'user'; content: string; link? : string}[]
    >([])
    const [onAiTyping, setOnAiTyping] = useState<boolean>(false);
    const [currentBotId, setCurrentBotId] = useState<string>()
    const [onRealTime, setOnRealTime] = useState<
        { chatroom: string; mode: boolean } | undefined
    >(undefined)

    const onScrollToBottom = () => {
        messageRefWindow.current?.scroll({
          top: messageRefWindow.current.scrollHeight,
          left: 0,
          behavior: 'smooth',
        })
      }
    
    useEffect(() => {
    onScrollToBottom()
    }, [onChats, messageRefWindow])

    useEffect(() => {
        postToParent(
          JSON.stringify({
            width: botOpened ? 550 : 80,
            height: botOpened ? 800 : 80,
          })
        )
    }, [botOpened])

    const onGetDomainChatBot = async(id: string) => {
        try{
            setLoading(true)
            setCurrentBotId(id);
            const chatBot = await onGetCurrentChatBot(id);
            if (chatBot) {
                setOnChats((prev) => [
                    ...prev,
                    {
                        role: 'assistant',
                        content: chatBot.chatBot?.welcomeMessage!,
                    },
                    ])
                setCurrentBot(chatBot)
                setLoading(false)
            }
        } catch (err) {
            console.log('OnGetDomainChatBot ', err);
        }
    }

    let limitRequest = 0;

    useEffect(() => {
        window.addEventListener('message', (e) => {
          console.log(e.data)
          const botid = e.data
          if (limitRequest < 1 && typeof botid == 'string') {
            onGetDomainChatBot(botid)
            limitRequest++
          }
        })
    }, [])

    const onStartChatting = handleSubmit(async (values) => {
        try {
            if (values.image.length) {
                const image = await upload.uploadFile(values.image[0]);
                setOnChats((prev) => [
                    ...prev,
                    {
                        role: 'user',
                        content: image.uuid,
                    }
                ])
                setOnAiTyping(true);

                const imageResponse = await onAiChatBotAssistant(
                    currentBotId!,
                    onChats,
                    'user',
                    image.uuid,
                )

                if (imageResponse) {
                    setOnAiTyping(false)
                    // if (imageResponse.live) {
                    //   setOnRealTime((prev) => ({
                    //     ...prev,
                    //     chatroom: imageResponse.chatRoom,
                    //     mode: imageResponse.live,
                    //   }))
                    // } else {
                    setOnChats((prev: any) => [...prev, imageResponse.response])
                    //}
                  }
            } // ends image length

            if(values.content) {
                if (!onRealTime?.mode) {
                    setOnChats((prev: any) => [
                      ...prev,
                      {
                        role: 'user',
                        content: values.content,
                      },
                    ])
                }
                setOnAiTyping(true)

                const response = await onAiChatBotAssistant(
                    currentBotId!,
                    onChats,
                    'user',
                    values.content
                )

                if (response) {
                    setOnAiTyping(false)
                    // if (response.live) {
                    //     setOnRealTime((prev) => ({
                    //         ...prev,
                    //         chatroom: response.chatRoom,
                    //         mode: response.live,
                    //     }))
                    // } else {
                    setOnChats((prev: any) => [...prev, response.response])
                    //}
                }
            }//values.content
            reset();
        } catch( err) {
            console.log(err);
        }
    })

    return {
        botOpened,
        onOpenChatBot,
        onStartChatting,
        onChats,
        register,
        onAiTyping,
        messageRefWindow,
        currentBot,
        loading,
        setOnChats,
        onRealTime,
        errors,
      }
} 