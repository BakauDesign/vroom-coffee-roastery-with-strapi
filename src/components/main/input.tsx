import {
    component$,
    createContextId,
    Slot,
    useContext,
    useContextProvider,
    useSignal
} from '@builder.io/qwik';

import type {
    Component,
    InputHTMLAttributes
} from '@builder.io/qwik';

import Eye from "~/assets/Icons/Eye.svg";
import EyeClosed from "~/assets/Icons/Eye Closed.svg";

interface InputProps {
    disabled?: boolean;
}

interface InputComponent extends Component {
    Root: Component<InputProps>;
    Header: Component;
    Label: Component;
    Option: Component;
    FieldText: Component<InputHTMLAttributes<HTMLInputElement>>;
    FieldPassword: Component<InputHTMLAttributes<HTMLInputElement>>;
    Message: Component;
}

const InputContext = createContextId<InputProps>('input.context');

export const Input = component$(() => {
    return <Slot />;
}) as InputComponent;

Input.Root = component$((props) => {
    useContextProvider(InputContext, props);

    return (
        <div class="flex flex-col gap-y-2 font-work-sans text-label-small sm:text-label-medium">
            <Slot />
        </div>
    );
})

Input.Header = component$(() => {
    return (
        <div class="flex items-center justify-between gap-x-6">
            <Slot />
        </div>
    );
})

Input.Label = component$(() => {
    const props = useContext(InputContext);

    return (
        <label class={`${props.disabled ? "text-neutral-400" : "text-neutral-950"} font-medium`}>
            <Slot />
        </label>
    );
});

Input.Option = component$(() => {
    const props = useContext(InputContext);

    return (
        <p class={`${props.disabled ? "text-neutral-400" : "text-neutral-500"}`}>
            <Slot />
        </p>
    );
});

Input.FieldText = component$<InputHTMLAttributes<HTMLInputElement>>((props) => {
    const rootProps = useContext(InputContext);

    return (
        <div class="h-[48px] pr-3 bg-primary-base border-[1.5px] border-neutral-200 rounded-[6px] flex items-center justify-between">
            <input
                {...props}
                disabled={rootProps.disabled || props.disabled}
                class="py-2 pl-4 h-full w-full outline-none text-neutral-700 placeholder:text-neutral-400"
            />
        </div>
    );
});


Input.FieldPassword = component$<InputHTMLAttributes<HTMLInputElement>>((props) => {
    const rootProps = useContext(InputContext);

    const hidePassword = useSignal(true);

    return (
        <div class="h-[48px] pr-3 bg-primary-base border-[1.5px] border-neutral-200 rounded-[6px] flex items-center justify-between">
            <input
                {...props}
                type={hidePassword.value ? "password" : "text"}
                disabled={rootProps.disabled || props.disabled}
                class="py-2 pl-4 h-full w-full outline-none text-neutral-700 placeholder:text-neutral-400"
            />

            <img
                src={hidePassword.value ? Eye : EyeClosed}
                class="cursor-pointer"
                alt="Eye icon"
                onClick$={() => hidePassword.value = !hidePassword.value}
                height={24}
                width={24}
            />
        </div>
    );
});

Input.Message = component$(() => {
    const props = useContext(InputContext);

    return (
        <div q:slot="message" class={`${props.disabled ? "text-neutral-400" : "text-neutral-700"}`}>
            <Slot />
        </div>
    );
});