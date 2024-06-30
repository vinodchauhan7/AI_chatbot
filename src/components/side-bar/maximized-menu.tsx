import { SIDE_BAR_MENU } from '@/constants/menu'
import React from 'react'
import Image from 'next/image'
import { LogOut, MonitorSmartphone, Menu } from 'lucide-react'
import MenuItems from './menu-items'
import DomainMenu from './domain-menu'

type Props = {
    onExpand() : void
    current: string | undefined
    onSignOut(): void
    domains:
        | {
            id: string
            name: string
            icon: string | null
        }[]
        | null
        | undefined
}

const MaxMenu = ({
    onExpand,
    current,
    onSignOut,
    domains,
} : Props) => {
    return (
        <div className="py-3 px-4 flex flex-col h-full">
            <div className="flex justify-between items-center">
                <Image
                    src="/images/logo.png"
                    alt="LOGO"
                    sizes="100vw"
                    className="animate-fade-in opacity-0 delay-300 fill-mode-forwards"
                    style={{
                        width: '50%',
                        height: 'auto',
                    }}
                    width={0}
                    height={0}
                />
                <Menu
                    className="cursor-pointer animate-fade-in opacity-0 delay-300 fill-mode-forwards"
                    onClick={onExpand}
                />
            </div>
            <div className="animate-fade-in opacity-0 delay-300 fill-mode-forwards flex flex-col justify-between h-full pt-10">
                <div className="flex flex-col">
                    <p className="text-xs text-white mb-3">MENU</p>
                    {SIDE_BAR_MENU.map((menu, key) => (
                        <MenuItems
                        size="max"
                        {...menu}
                        key={key}
                        current={current}
                        />
                    ))}
                    <DomainMenu domains={domains} />
                </div>
                <div className="flex flex-col">
                    <p className="text-xs text-white mb-3">OPTIONS</p>
                    <MenuItems
                        size="max"
                        label="Sign out"
                        icon={<LogOut />}
                        onSignOut={onSignOut}
                    />
                    <MenuItems
                        size="max"
                        label="Mobile App"
                        icon={<MonitorSmartphone />}
                    />
                </div>
            </div>
        </div>
    )
}

export default MaxMenu;