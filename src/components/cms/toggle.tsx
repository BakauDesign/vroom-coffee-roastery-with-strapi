import {
    component$,
    useSignal
} from '@builder.io/qwik';

import type {
    QRL,
    HTMLAttributes
} from '@builder.io/qwik';

import { cn } from "~/lib/utils";

interface ToggleProps 
    extends HTMLAttributes<HTMLElement> {
        size?: "small" | "large";
        value?: any;
        disabled?: boolean;
        onClick$?: QRL<(value?: any) => void>;
}

export const Toggle = component$<ToggleProps>((
    { size = "small", disabled, onClick$, value = false,  ...props }) => {
    const state = useSignal(value);

    return (
        <div
            {...props}
            class={`
                ${cn(props.class)}
                h-fit ${size === "small" ? "w-[36px]" : "w-[48px]"} rounded-full
                ${state.value ? "bg-green-50" : "bg-neutral-custom-100"}
                ${disabled ? "bg-neutral-custom-100 cursor-not-allowed" : "cursor-pointer"}
                ${(state.value && size === "small") && !disabled ? "*:translate-x-[18px]" : "*:translate-x-0"}
                ${(state.value && size === "large") && !disabled ? "*:translate-x-[22px]" : "*:translate-x-0"}
            `}
            // onClick$={() => state.value = !state.value }
            onClick$={() => {
                if (disabled) return;
                state.value = !state.value;
                onClick$ && onClick$(state.value);
            }}
        >
            <div 
                class={`
                    ${size === "small" ? "h-[16px] w-[16px]" : "h-[24px] w-[24px]"} rounded-full transition-all
                    ${(state.value && !disabled) && "bg-green-500"}
                    ${(!state.value && !disabled) && "bg-neutral-custom-500"}
                    ${disabled && "bg-neutral-custom-400"}
                `}
            />
        </div>
    );
});