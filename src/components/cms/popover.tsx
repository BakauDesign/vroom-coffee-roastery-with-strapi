import { 
    component$,
    createContextId,
    Slot,
    useContext,
    useContextProvider,
    useSignal
} from '@builder.io/qwik';

import type {
    Signal,
    Component,
    ButtonHTMLAttributes,
    HTMLAttributes
} from '@builder.io/qwik';

import { cn } from "~/lib/utils";

interface PopoverProps
    extends HTMLAttributes<HTMLElement> {}

interface TriggerProps
    extends ButtonHTMLAttributes<HTMLButtonElement> {}

interface ContentProps
    extends HTMLAttributes<HTMLElement> {}

interface PopoverComponent extends Component {
    Root: Component<PopoverProps>;
    Trigger: Component<TriggerProps>;
    Content: Component<ContentProps>;
}

const PopoverContentContext = createContextId<{ isOpened: Signal<boolean> }>('popover-content.context');

export const Popover = component$(() => {
    return <Slot />;
}) as PopoverComponent;

Popover.Root = component$((
    { class: className, ...props }) => {
    const isOpened = useSignal(false);

    useContextProvider(PopoverContentContext, { isOpened });

    return (
        <div
            class={`
                font-inter relative flex flex-col transition-all duration-300
                ${cn(className)}	
                        
            `}
            {...props}
        >
            {isOpened.value && (
				<div 
					onClick$={() => isOpened.value = false}
					class={`
						fixed top-0 left-0 right-0 bottom-0
					`} 
				/>
			)}
            <Slot />
        </div>
    );
})

Popover.Trigger = component$<TriggerProps>((
    { class: className, ...props }) => {
    const { isOpened } = useContext(PopoverContentContext);

    return (
        <button
            class={`
                ${cn(className)}
                select-none cursor-pointer
            `}
            onClick$={() => isOpened.value = true}
            {...props}
        >
            <Slot />
        </button>
    );
});

Popover.Content = component$<ContentProps>((
    { class: className, ...props }) => {
    const { isOpened } = useContext(PopoverContentContext);

    return (
        <section
            class={`
                overflow-x-hidden overflow-y-scroll transition-all duration-300 absolute z-10 top-7 p-3 rounded flex flex-wrap gap-4 bg-neutral-custom-base border-neutral-custom-100
				${isOpened.value ? "border-[1.5px] opacity-100 z-10" : "opacity-0"}
                ${cn(className)}
            `}
            {...props}
        >
            <Slot />
        </section>
    );
});