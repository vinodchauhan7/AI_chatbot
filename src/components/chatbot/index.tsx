'use client'

import { BotIcon } from '@/icons/bot-icon';
import { cn } from '@/lib/utils';
import React from 'react';
import Image from 'next/image'
import { BotWindow } from './window';
import { useChatBot } from '@/hooks/chatbot/use-chat-bot';

type Props = {};

const AIChatBot = (props: Props) => {
    const {
        onOpenChatBot,
        botOpened,
        onChats,
        register,
        onStartChatting,
        onAiTyping,
        messageRefWindow,
        currentBot,
        loading,
        onRealTime,
        setOnChats,
        errors,
    } = useChatBot();
    return (
        <div className="h-screen flex flex-col justify-end items-end gap-4">
      {botOpened && (
        <BotWindow
          errors={errors}
          setChat={setOnChats}
          realtimeMode={onRealTime}
          helpdesk={currentBot?.helpdesk!}
          domainName={currentBot?.name!}
          ref={messageRefWindow}
          help={currentBot?.chatBot?.helpdesk}
          theme={currentBot?.chatBot?.background}
          textColor={currentBot?.chatBot?.textColor}
          chats={onChats}
          register={register}
          onChat={onStartChatting}
          onResponding={onAiTyping}
          bot_name={currentBot?.chatBot?.bot_name}
        />
      )}
      <div
        className={cn(
          'rounded-full relative cursor-pointer shadow-md w-20 h-20 flex items-center justify-center bg-grandis',
          loading ? 'invisible' : 'visible'
        )}
        onClick={onOpenChatBot}
      >
        {currentBot?.chatBot?.icon ? (
          <Image
            src={`https://ucarecdn.com/${currentBot.chatBot.icon}/`}
            alt="bot"
            fill
          />
        ) : (
          <BotIcon />
        )}
      </div>
    </div>
    )
}

export default AIChatBot;