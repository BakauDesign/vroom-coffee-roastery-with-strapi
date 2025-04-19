import { component$, Slot } from '@builder.io/qwik';

// import type { QRL } from '@builder.io/qwik';
import type { HTMLAttributes } from '@builder.io/qwik';

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
    variant: 'primary' | 'secondary' | 'tertiary';
	size?: 'small' | 'medium' | 'large';
	disabled?: boolean;
    fillContainer?: boolean;
	// onClick$?: QRL<(event: MouseEvent, element: HTMLButtonElement) => void>;
}

export const Button = component$<ButtonProps>(({
    variant,
	size = 'small',
    disabled = false,
    fillContainer = false,
	...props
}) => {
    return (
        <button
            {...props}
            onClick$={props.onClick$}
            disabled={disabled}
            class={`
                py-1.5 cursor-pointer
                ${size === "small" && "px-[18px] h-[44px]"} 
                ${size === "medium" && "px-5 h-[48px]"} 
                ${size === "large" && "px-6 h-[50px]"}

                ${fillContainer ? "w-full" : "w-fit"}

                ${(variant === "primary" && !disabled) ? 
                    "bg-primary-500 hover:bg-primary-600 hover:border-[2px] hover:border-primary-200 active:bg-primary-500 active:border-[2px] active:border-primary-500 text-primary-base" 
                    : "bg-neutral-custom-50 text-neutral-custom-400"
                }

                ${(variant === "secondary" && !disabled) ? 
                    "bg-primary-base border-[2px] border-solid border-primary-400 hover:border-primary-500 active:border-primary-400 text-primary-500 active:text-primary-600"
                    : "bg-neutral-custom-50 text-neutral-custom-400"
                }

                ${(variant === "tertiary" && !disabled) ? 
                    "text-primary-400 hover:text-primary-300 active:text-primary-600"
                    : "text-neutral-custom-400"
                }

                font-medium font-work-sans text-label-small sm:text-label-medium rounded-[12px]
            `}
        >
            <Slot />
        </button>
    );
});