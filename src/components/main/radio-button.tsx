import { component$, Slot } from '@builder.io/qwik';

import type { QRL } from '@builder.io/qwik';

interface RadioButtonProps {
    name?: string;
    type?: "circle" | "square";
    isSelected?: boolean;
    disabled?: boolean;
    onClick$?: QRL<() => void>;
}

export const RadioButton = component$<RadioButtonProps>(({
    name,
    type = "circle",
    isSelected = false,
    disabled,
    onClick$
}) => {
    return (
        <div
            class={`flex items-center gap-x-2.5 font-work-sans font-medium text-neutral-700 text-label-small sm:text-label-medium select-none ${disabled ? "cursor-default *:cursor-default" : "cursor-pointer *:cursor-pointer"}`}
            onClick$={() => onClick$ && onClick$()}
        >
            <div class={`
                h-[24px] w-[24px] flex items-center justify-center gap-x-2.5 bg-primary-base border-[1px] border-solid
                *:h-[12px] *:w-[12px]
                ${type === "circle" ? "rounded-full *:rounded-full" : "rounded-[4px] *:rounded-[4px]"}
                ${(isSelected && !disabled) && "*:bg-primary-400 border-primary-400"} 
                ${(!isSelected && !disabled) && "*:bg-primary-50 border-primary-400"} 
                ${disabled && "*:bg-neutral-200 border-neutral-custom-100"}
            `}>
                <span />
            </div>

            <label for={name}>
                <Slot />
            </label>
        </div>
    );
});