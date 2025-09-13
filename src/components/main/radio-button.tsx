import {
    component$,
    createContextId,
    Slot,
    useContext,
    useContextProvider
} from '@builder.io/qwik';

import type {
    Component,
    HTMLAttributes,
    QRL,
    Signal
} from '@builder.io/qwik';

import { cn } from "~/lib/utils";

export interface RadioButtonGroupProps
    extends HTMLAttributes<HTMLElement>
    {
        type?: "circle" | "square";
        disabled?: boolean;
        currentValue?: Signal<any>;
        onClickOption$?: QRL<(value?: any) => void>;
}

export interface RadioButtonProps
    extends RadioButtonGroupProps
    {
        name?: string;
        value?: any;
}

export interface RadioButtonGroupComponent
    extends Component
    {
    Root: Component<RadioButtonGroupProps>;
    Label: Component<HTMLAttributes<HTMLLabelElement>>;
    Items: Component<HTMLAttributes<HTMLElement>>;
    Item: Component<RadioButtonProps>
}


const RadioButtonGroupContext = createContextId<RadioButtonGroupProps>('radio-button-group.context');

export const RadioButtonGroup = component$(() => {
    return <Slot />;
}) as RadioButtonGroupComponent;

RadioButtonGroup.Root = component$((
    { class: className, ...props }) => {
    useContextProvider(RadioButtonGroupContext, props);
    
    return (
        <div class={`${cn(className)} flex`} {...props}>
            <Slot />
        </div>
    );
})

RadioButtonGroup.Label = component$((
    { class: className, ...props }) => {
    return (
        <label class={`${cn(className)} font-lora text-h3-small font-medium text-neutral-custom-800`} {...props}>
            <Slot />
        </label>
    );
});

RadioButtonGroup.Items = component$((
    { class: className, ...props }) => {
    return (
        <div class={`${cn(className)} flex`} {...props}>
            <Slot />
        </div>
    );
});

RadioButtonGroup.Item = component$<RadioButtonProps>((
    { name, type = "circle", value, disabled }) => {
    const { currentValue, onClickOption$, ...props } = useContext(RadioButtonGroupContext);

    return (
        <div
            class={`flex items-center gap-x-2.5 font-work-sans font-medium text-neutral-700 text-label-small sm:text-label-medium select-none ${disabled ? "cursor-default *:cursor-default" : "cursor-pointer *:cursor-pointer"}`}
            onClick$={() => {
                (onClickOption$ && !(disabled || props.disabled)) && onClickOption$(value);
            }}
        >
            <div class={`
                h-[24px] w-[24px] flex items-center justify-center gap-x-2.5 bg-primary-base border-[1px] border-solid
                *:h-[12px] *:w-[12px]
                ${type === "circle" ? "rounded-full *:rounded-full" : "rounded-[4px] *:rounded-[4px]"}
                ${((value === currentValue?.value) && !disabled) && "*:bg-primary-400 border-primary-400"} 
                ${((!(value === currentValue?.value)) && !disabled) && "*:bg-primary-50 border-primary-400"} 
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

export const RadioButton = component$<RadioButtonProps>(({
    name,
    type = "circle",
    currentValue,
    value,
    disabled,
    onClickOption$
}) => {
    return (
        <div
            class={`flex items-center gap-x-2.5 font-work-sans font-medium text-neutral-700 text-label-small sm:text-label-medium select-none ${disabled ? "cursor-default *:cursor-default" : "cursor-pointer *:cursor-pointer"}`}
            onClick$={() => {
                (onClickOption$ && !(disabled || disabled)) && onClickOption$(value);
            }}
        >
            <div class={`
                h-[24px] w-[24px] flex items-center justify-center gap-x-2.5 bg-primary-base border-[1px] border-solid
                *:h-[12px] *:w-[12px]
                ${type === "circle" ? "rounded-full *:rounded-full" : "rounded-[4px] *:rounded-[4px]"}
                ${((value === currentValue?.value) && !disabled) && "*:bg-primary-400 border-primary-400"}
                ${((!(value === currentValue?.value)) && !disabled) && "*:bg-primary-50 border-primary-400"}
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