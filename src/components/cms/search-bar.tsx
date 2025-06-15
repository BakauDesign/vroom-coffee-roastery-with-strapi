import { 
    component$,
    useSignal,
    useTask$
} from '@builder.io/qwik';

import type { InputHTMLAttributes, QRL } from '@builder.io/qwik';

import Magnifier from "~/assets/Icons/Magnifer.svg";

export interface SearchBarProps extends InputHTMLAttributes<HTMLInputElement> {
    delay?: number;
    onValueChange?: QRL<(value: string) => void>;
}

export const SearchBar = component$<SearchBarProps>(({ 
    delay = 300, 
    placeholder = 'Search...',
    onValueChange,
    ...props
}) => {
    const inputValue = useSignal('');
    const debouncedValue = useSignal('');

    useTask$(({ track, cleanup }) => {
        track(() => inputValue.value);
        
        const timer = setTimeout(() => {
            debouncedValue.value = inputValue.value;
            onValueChange && onValueChange(inputValue.value);
        }, delay);

        cleanup(() => clearTimeout(timer));
    });

    return (
        <div class={`
            h-[48px] pl-4 flex gap-x-6 items-center overflow-hidden rounded-[6px] bg-neutral-custom-base border-solid border-[1.5px] border-neutral-custom-200
        `}>
            <img src={Magnifier} alt="Magnifier" height={24} width={24} />

            <input
                type="text"
                bind:value={inputValue}
                placeholder={placeholder}
                {...props}
                class="h-full w-full py-1 pr-4 font-inter text-cms-label-small sm:text-cms-label-medium text-neutral-custom-700 placeholder:text-neutral-custom-400 outline-none"
            />
        </div>
    );
});