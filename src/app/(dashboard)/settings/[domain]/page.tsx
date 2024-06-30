import { onGetCurrentDomainInfo } from '@/actions/settings';
import BotTrainingForm from '@/components/forms/settings/bot-training';
import SettingsForm from '@/components/forms/settings/setting-form';
import InfoBar from '@/components/infobar';
import { redirect } from 'next/navigation';
import React from 'react';

type Props = {
    params: {domain: string},
};

const DomainSettingPage = async ({params}: Props) => {
    const domain = await onGetCurrentDomainInfo(params.domain);
    if (!domain) redirect('/dashboard')
    return (
        <div className='overflow-y-auto chat-window w-full flex-1 h-0'>
            <InfoBar />
            <SettingsForm
                plan={domain.subscription?.plan!}
                chatBot={domain.domains[0].chatBot}
                id={domain.domains[0].id}
                name={domain.domains[0].name}
            />
            <BotTrainingForm id={domain.domains[0].id} />
        </div>
    )
}

export default DomainSettingPage;