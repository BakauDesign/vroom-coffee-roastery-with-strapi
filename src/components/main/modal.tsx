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
    HTMLAttributes
} from '@builder.io/qwik';

import { cn } from "~/lib/utils";

interface ModalProps
    extends HTMLAttributes<HTMLElement> {}

interface TriggerProps
    extends HTMLAttributes<HTMLElement> {}

interface ContentProps
    extends HTMLAttributes<HTMLElement> {}

interface ModalComponent extends Component {
    Root: Component<ModalProps>;
    TriggerOpen: Component<TriggerProps>;
    TriggerClose: Component<TriggerProps>;
    Content: Component<ContentProps>;
}


const ModalContentContext = createContextId<{ isOpened: Signal<boolean> }>('modal-content.context');

export const Modal = component$(() => {
    return <Slot />;
}) as ModalComponent;

Modal.Root = component$((
    { class: className, ...props }) => {
    const isOpened = useSignal(false);

    useContextProvider(ModalContentContext, { isOpened });

    return (
        <div
            class={`
                font-inter flex flex-col transition-all duration-300
                ${cn(className)}	
                        
            `}
            {...props}
        >
            {/* {isOpened.value && (
                <div 
                    onClick$={() => isOpened.value = false}
                    class={`
                        fixed top-0 left-0 right-0 bottom-0
                    `} 
                />
            )} */}
            <Slot />
        </div>
    );
})

Modal.TriggerOpen = component$<TriggerProps>((
    { class: className, ...props }) => {
    const { isOpened } = useContext(ModalContentContext);

    return (
        <div
            class={`
                ${cn(className)}
                select-none cursor-pointer
            `}
            onClick$={() => isOpened.value = true}
            {...props}
        >
            <Slot />
        </div>
    );
});

Modal.TriggerClose = component$<TriggerProps>((
    { class: className, ...props }) => {
    const { isOpened } = useContext(ModalContentContext);

    return (
        <div
            class={`
                ${cn(className)}
                select-none cursor-pointer
            `}
            onClick$={() => isOpened.value = false}
            {...props}
        >
            <Slot />
        </div>
    );
});

Modal.Content = component$<ContentProps>((
    { class: className, ...props }) => {
    const { isOpened } = useContext(ModalContentContext);

    return (
        <section
            class={`
                overflow-hidden transition-all duration-300 border-none flex justify-center items-center 
                fixed z-50 left-4 right-4 *:h-full *:overflow-y-scroll *:max-w-[1000px]
                ${isOpened.value ? "border-[1.5px] opacity-100 top-32 bottom-6" : "opacity-0 bottom-[100vh]"}
                ${cn(className)}
            `}
            // onClick$={() => isOpened.value = false}
            {...props}
        >
            <Slot />
        </section>
    );
});