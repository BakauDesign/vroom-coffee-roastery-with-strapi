import { 
    component$,
    Slot,
    createContextId,
    useContextProvider,
    useContext,
    useSignal
} from "@builder.io/qwik";

import type { 
    Signal,
    Component,
    HTMLAttributes 
} from "@builder.io/qwik";

import { Complete } from "~/assets/cms/icons/Complete";
import { Error } from "~/assets/cms/icons/Error";
import { ChevronDown } from "~/assets/cms/icons/ChevronDown";
import { Separator } from "~/components/cms/separator";

interface ParagraphProps extends
    HTMLAttributes<HTMLParagraphElement> {}

interface FormProps {
    isOpened?: boolean;
    error?: boolean;
}

interface FormComponent extends Component {
    Root: Component<FormProps>;
    Header: Component<HTMLAttributes<HTMLElement>>;
    Headline: Component<ParagraphProps>;
    SupportingHeadline: Component<ParagraphProps>;
    Content: Component;
}

const FormBlockContext = createContextId<FormProps>('form-block.context');
const FormBlockContentContext = createContextId<{ isOpened: Signal<boolean> }>('form-block-content.context');


export const FormBlock = component$(() => {
    return <Slot />;
}) as FormComponent;

FormBlock.Root = component$((props) => {
    const contentRef = useSignal<HTMLElement>();
    const isOpened = useSignal(props.isOpened || false);

    useContextProvider(FormBlockContext, props);
    useContextProvider(FormBlockContentContext, { isOpened });

    return (
        <section 
            class="flex flex-col gap-4 font-inter transition-all duration-500 ease-in-out"
            style={{
                height: isOpened.value 
                    ? `${contentRef.value?.scrollHeight}px` 
                    : '58px'
            }}

            ref={contentRef}    
        >
            <Slot />
        </section>
    );
});

FormBlock.Content = component$(() => {
    return (
        <section class={`md:pl-14 *:flex *:flex-col *: *:sm:gap-y-6 *:lg:gap-y-9`}>
            <Slot />
        </section>
    );
});

FormBlock.Header = component$(() => {
    const { isOpened } = useContext(FormBlockContentContext);
    const { error } = useContext(FormBlockContext);
    
    return (
        <section class="flex gap-6 items-center justify-between *:flex *:gap-6 cursor-pointer"        
            onClick$={() => isOpened.value = !isOpened.value}
        >
            <section class="w-full">
                { error ? <Error /> : <Complete /> }

                <section class="w-full flex flex-col gap-2">
                    <Slot />
                </section>
            </section>

            <ChevronDown class={`text-neutral-custom-800 ${!isOpened.value ? "rotate-180" : "rotate-0"}`} />
        </section>
    );
});

FormBlock.Headline = component$((
    { ...props }) => {
    return <h1 {...props} class="text-h3-small sm:text-h3-medium lg:text-h3-large font-medium text-neutral-custom-800"><Slot /></h1>;
});

FormBlock.SupportingHeadline = component$((
    { ...props }) => {
    return <h2 {...props} class="text-label-small sm:text-label-medium text-neutral-custom-600"><Slot /></h2>;
});