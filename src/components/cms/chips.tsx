import {
    component$,
    createContextId,
    Slot,
    useContext,
    useContextProvider
} from '@builder.io/qwik';

import type { QRL, Component, InputHTMLAttributes, HTMLAttributes } from '@builder.io/qwik';

export interface ChipsProps extends
    HTMLAttributes<HTMLInputElement>
    {
        id?: string;
        name?: string;
        value?: number | string;
        disabled?: boolean;
        onClick$?: QRL<(value?: any) => void>;
        currentValue?: any;
}

export interface ItemProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, "value">
    {
        value: string;
        selected?: boolean;
}
 
export interface ChipsComponent extends Component {
    Root: Component<ChipsProps>;
    Header: Component;
    Label: Component;
    Option: Component;
    Items: Component;
    Item: Component<ItemProps>;
    Handler: Component<InputHTMLAttributes<HTMLInputElement>>;
}

const ChipsContext = createContextId<ChipsProps>('chips.context');

export const Chips = component$(() => {
    return <Slot />;
}) as ChipsComponent;

Chips.Root = component$((props) => {
    useContextProvider(ChipsContext, props);

    return (
        <div class="w-full flex flex-col gap-y-2.5 font-inter text-cms-label-small sm:text-cms-label-medium">
            <Slot />
        </div>
    );
});

Chips.Header = component$(() => {
    return (
        <div class="flex items-center justify-between gap-x-6">
            <Slot />
        </div>
    );
});

Chips.Label = component$(() => {
    const props = useContext(ChipsContext);

    return (
        <label class={`${props.disabled ? "text-neutral-400" : "text-neutral-950"} font-medium`}>
            <Slot />
        </label>
    );
});

Chips.Option = component$(() => {
    const props = useContext(ChipsContext);

    return (
        <div class={`${props.disabled ? "text-neutral-400" : "text-neutral-500"}`}>
            <Slot />
        </div>
    );
});

Chips.Items = component$(() => {
    return (
        <div class="flex flex-wrap gap-3">
            <Slot />
        </div>
    );
});

Chips.Item = component$(({ selected, value, disabled: itemDisabled }) => {
    const { name, disabled, currentValue, onClick$ } = useContext(ChipsContext);

    return (
        <>
            <label
                for={value.toString()}
                onClick$={() => onClick$?.(value)}
                
                class={`
                    h-[40px] py-1.5 px-3 flex items-center font-medium transition-all rounded-[4px]
                    ${(currentValue === value && !(disabled || itemDisabled)) && "bg-primary-50 text-primary-800 border-primary-50"}
                    ${(!(currentValue === value) && !(disabled || itemDisabled)) && "bg-neutral-custom-base text-neutral-custom-700 border-neutral-custom-100"}
                    ${(disabled || itemDisabled) ? "bg-neutral-custom-50 text-neutral-custom-400 border-none cursor-not-allowed" : "cursor-pointer border-[1.5px] select-none"}
                `}
            >
                { value.toString() }
            </label>

            <input
                // {...props}
                // class="hidden"
                checked={selected}
                type='radio'
                id={value.toString()}
                name={name}
                value={value}
            />
        </>
    );
});