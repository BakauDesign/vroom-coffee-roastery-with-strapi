import {
    component$,
    createContextId,
    Slot,
    useContext,
    useContextProvider
} from '@builder.io/qwik';

import type {
    Component,
    TextareaHTMLAttributes
} from '@builder.io/qwik';

interface TextFieldProps {
    disabled?: boolean;
}

interface TextFieldComponent extends Component {
    Root: Component<TextFieldProps>;
    Header: Component;
    Label: Component;
    Option: Component;
    Field: Component<TextareaHTMLAttributes<HTMLTextAreaElement>>;
    Message: Component;
}

const TextFieldContext = createContextId<TextFieldProps>('input.context');

export const TextField = component$(() => {
    return <Slot />;
}) as TextFieldComponent;

TextField.Root = component$((props) => {
    useContextProvider(TextFieldContext, props);

    return (
        <div class="flex flex-col gap-y-2 font-work-sans text-label-small sm:text-label-medium">
            <Slot />
        </div>
    );
})

TextField.Header = component$(() => {
    return (
        <div class="flex items-center justify-between gap-x-6">
            <Slot />
        </div>
    );
})

TextField.Label = component$(() => {
    const props = useContext(TextFieldContext);

    return (
        <label class={`${props.disabled ? "text-neutral-400" : "text-neutral-950"} font-medium`}>
            <Slot />
        </label>
    );
});

TextField.Option = component$(() => {
    const props = useContext(TextFieldContext);

    return (
        <p class={`${props.disabled ? "text-neutral-400" : "text-neutral-500"}`}>
            <Slot />
        </p>
    );
});

TextField.Field = component$<TextareaHTMLAttributes<HTMLTextAreaElement>>((props) => {
    const rootProps = useContext(TextFieldContext);

    return (
        <div class="h-fit *:min-h-[120px] bg-primary-base border-[1.5px] border-neutral-200 rounded-[6px] flex items-center justify-between">
            <textarea
                {...props}
                disabled={rootProps.disabled || props.disabled}
                class="py-2 pl-4 pr-3 h-full w-full outline-none text-neutral-700 placeholder:text-neutral-400"
            />
        </div>
    );
});

TextField.Message = component$(() => {
    const props = useContext(TextFieldContext);

    return (
        <div q:slot="message" class={`${props.disabled ? "text-neutral-400" : "text-neutral-700"}`}>
            <Slot />
        </div>
    );
});