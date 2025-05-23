import { component$, Slot, useSignal } from '@builder.io/qwik';

import type { QRL } from '@builder.io/qwik';

import { Link, type LinkProps } from '@builder.io/qwik-city';

import ChevronDown from "~/assets/Icons/chevron-down.svg";

interface MenuItemProps extends LinkProps {
    state?: boolean;
    asDropdown?: boolean;
    asDropdownItem?: boolean;
    onClick$?: QRL<() => void>;
}
export const MenuItem = component$<MenuItemProps>(({
    state,
    asDropdown = false,
    asDropdownItem = false,
    onClick$,
    ...props
}) => {
    const isOpened = useSignal(false);

    if (asDropdown) {
        return (
            <div>
                <div class={`
                    w-fit min-w-[60px] py-2 px-3 h-[34px] text-label-small sm:text-label-medium font-medium font-work-sans rounded-full text-primary-700
                    relative flex items-center gap-x-2 select-none
                    ${state ? 'bg-primary-base' : 'bg-primary-50'}
                `}
                    onClick$={() => {
                        isOpened.value = !isOpened.value
                        onClick$ && onClick$();
                    }}>
                    <Slot name='label' />

                    <img src={ChevronDown} alt="chevron down" height={24} width={24} class={`${isOpened.value && "rotate-180"} transition-all`} />
                </div>
                
                <div class={`
                    bg-primary-base border-[1.5px] border-solid border-primary-50 rounded-[12px] select-none
                    flex flex-col gap-y-4 absolute lg:top-20 overflow-hidden transition-all pt-4 px-3 pb-3 h-fit
                    
                    ${isOpened.value 
                        ? "opacity-100 pointer-events-auto scale-100"
                        : "opacity-0 pointer-events-none scale-95"
                    }
                `}
                onClick$={() => isOpened.value = false}>
                    <Slot name='menu-item' />
                </div>
            </div>
        );
    }

    return (
        <Link 
            {...props}
            onClick$={() => onClick$ && onClick$()}
            class={`
                w-fit min-w-[60px] py-2 px-3 h-[34px] text-label-small sm:text-label-medium font-work-sans rounded-full
                ${(asDropdownItem) 
                    ? 'bg-primary-base text-neutral-custom-700 hover:font-medium'
                    : "text-primary-700 font-medium"
                }

                ${state ? 'bg-primary-base' : 'bg-primary-50'}
                

            `}
        >
            <Slot />
        </Link>
    );
});