'use client'

import useSideBar from "@/hooks/side-bar/use-side-bar";
import { cn } from "@/lib/utils";
import MaxMenu from "./maximized-menu";
import { MinMenu } from "./minimized-menu";

type Props = {
    domains: | {
        name: string
        id: string
        icon: string
    }[] | null | undefined
};

const SideBar = ({domains}: Props) => {
    const {expand, onSignOut, page, onExpand} = useSideBar();
    return (
        <div className={cn(
            'h-full w-[60px] bg-blue-950 text-white fill-mode-forwards fixed md:relative',
            expand == undefined && '',
            expand == true ? 'animate-open-sidebar' : expand == false && 'animate-close-sidebar'
        )}>
            {expand ? (
                <MaxMenu
                    domains={domains}
                    current={page!}
                    onExpand={onExpand}
                    onSignOut={onSignOut}
                />
            ) : (
                <MinMenu
                    domains={domains}
                    current={page!}
                    onShrink={onExpand}
                    onSignOut={onSignOut}
                />
            )
            
            }
        </div>
    )
}

export default SideBar;