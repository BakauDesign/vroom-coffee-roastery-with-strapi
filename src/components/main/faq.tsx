import { 
    component$,
    Slot,
    createContextId,
    useContextProvider,
    useContext,
    useSignal,
} from '@builder.io/qwik';

import type {
    Signal,
    Component
} from '@builder.io/qwik';

import ChevronDown from "~/assets/Icons/chevron-down.svg";

const FaqContext = createContextId<{ isOpened: Signal<boolean> }>('faq.context');

interface FaqProps {
    name?: string;
    disabled?: boolean;
    fillContainer?: boolean;
}

interface FaqComponent extends Component<FaqProps> {
    Root: Component<FaqProps>;
    Title: Component;
    Content: Component;
}

export const Faq: FaqComponent = component$(() => {
    return <Slot />;
}) as FaqComponent;

Faq.Root = component$<FaqProps>(() => {
    const isOpened = useSignal(false);
    const contentRef = useSignal<HTMLElement>();

    useContextProvider(FaqContext, { isOpened });

    return (
        <article 
            class={`
                flex flex-col gap-y-4 overflow-hidden
                transition-all duration-300 ease-in-out
                ${isOpened.value && "h-[48px]"}
            `}
            style={{
                height: isOpened.value 
                    ? `${contentRef.value?.scrollHeight}px` 
                    : '48px'
            }}
            ref={contentRef}
        >
            <Slot />
        </article>
    );
});

Faq.Title = component$(() => {
    const { isOpened } = useContext(FaqContext);

    return (
        <label class={`
            h-[48px] py-3 pl-4 pr-2 flex gap-x-4 justify-between items-center font-lora text-h3-small font-medium text-primary-700
            bg-primary-base border-primary-100 border-[1.5px] border-solid rounded-[6px]
        `}
        onClick$={() => isOpened.value = !isOpened.value}>
            <Slot />

            <img src={ChevronDown} alt="chevron-down" height={24} width={24} class={`${isOpened.value ? "rotate-180" : "rotate-0"}`} />
        </label>
    );
});

Faq.Content = component$(() => {
    return (
        <>
            <span class="opacity-100 block border-[1px] border-solid border-primary-200" />

            <section class={`
                font-work-sans text-neutral-custom-700 text-body-small sm:text-body-medium transition-all
                pl-4 pr-3 pb-3 bg-primary-base rounded-[4px]
            `}>
                <p>
                    <Slot />
                </p>
            </section>
        </>
    );
});