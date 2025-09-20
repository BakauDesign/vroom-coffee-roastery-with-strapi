import { 
    component$,
    useSignal,
    useTask$
} from '@builder.io/qwik';

import type { ClassList, QRL, Signal } from '@builder.io/qwik';

import Magnifier from "~/assets/Icons/Magnifer.svg";

import { cn } from '~/lib/utils';

export interface SearchBarProps {
    currentValue?: string;
    class?: ClassList | Signal<ClassList>;
    delay?: number;
    placeholder?: string;
    onValueChange$?: QRL<(value: string) => void>;
}

export const SearchBar = component$<SearchBarProps>(({
    class: className,
    delay = 300, 
    placeholder = 'Search...',
    currentValue,
    onValueChange$
}) => {
    const inputValue = useSignal(currentValue || '');
    const debouncedValue = useSignal(currentValue || '');

    useTask$(({ track, cleanup }) => {
        track(() => inputValue.value);
        
        const timer = setTimeout(() => {
            debouncedValue.value = inputValue.value;
            onValueChange$ && onValueChange$(inputValue.value);
        }, delay);

        cleanup(() => clearTimeout(timer));
    });

    return (
        <div class={`
            ${cn(className)}
            h-[48px] pl-4 flex gap-x-6 items-center overflow-hidden rounded-[6px] bg-primary-base border-solid border-[1.5px] border-neutral-custom-300 ${debouncedValue.value.length && "border-primary-300"}
        `}>
            <img src={Magnifier} alt="Magnifier" height={24} width={24} />

            <input
                type="text"
                bind:value={inputValue}
                placeholder={placeholder}
                class="h-full w-full py-1 pr-4 font-work-sans text-label-small sm:text-label-medium text-neutral-custom-700 placeholder:text-neutral-custom-400 outline-none"
            />
        </div>
    );
});