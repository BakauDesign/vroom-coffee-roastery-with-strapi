import { 
    component$,
    createContextId,
    Slot,
    useContext,
    useContextProvider,
    useSignal
} from '@builder.io/qwik';

import type {
    QRL,
    Signal,
    Component
} from '@builder.io/qwik';

import Chevron from "~/assets/Icons/chevron-down-cms.svg";
import Plus from "~/assets/Icons/plus.svg";
import Minus from "~/assets/Icons/dash.svg";
import { Link, useLocation } from '@builder.io/qwik-city';

interface DropdownProps {
    variant?: "option" | "menu";
    disabled?: boolean;
    currentValue?: any;
    isOpened?: boolean;
    fillContainer?: boolean;
    onClickOption$?: QRL<(value?: any) => void>;
}

interface ItemProps {
    value?: any;
    href?: string;
    onClick$?: QRL<(value?: any) => void>;
}

interface DropdownComponent extends Component {
    Root: Component<DropdownProps>;
    Label: Component;
    Icon: Component<{ src: string; }>;
    Items: Component;
    Item: Component<ItemProps>;
}

const DropdownContext = createContextId<DropdownProps>('dropdown.context');
const DropdownContentContext = createContextId<{ isOpened: Signal<boolean> }>('dropdown-content.context');

export const Dropdown = component$(() => {
    return <Slot />;
}) as DropdownComponent;

Dropdown.Root = component$((props) => {
    const contentRef = useSignal<HTMLElement>();
    const isOpened = useSignal(false);

    useContextProvider(DropdownContext, props);
    useContextProvider(DropdownContentContext, { isOpened });

    return (
        <div 
            class={`
                ${props.fillContainer ? "w-full" : "w-fit"}
                flex flex-col gap-y-2 font-inter text-label-small sm:text-label-medium select-none relative transition-all duration-500 ease-in-out overflow-hidden
            `}
            
            style={{
                height: isOpened.value 
                    ? `${contentRef.value?.scrollHeight}px` 
                    : '40px'
            }}

            ref={contentRef}
        >
            <Slot />
        </div>
    );
});

Dropdown.Label = component$(() => {
    const { isOpened } = useContext(DropdownContentContext);
    const props = useContext(DropdownContext);

    return (
        <label 
            class={`
                ${props.fillContainer ? "w-full" : "w-fit"}
                flex gap-x-3 items-center bg-neutral-custom-base border-[1.5px] rounded-[4px] cursor-pointer
                ${props.disabled ? "text-neutral-custom-400" : "text-neutral-custom-800"}
                ${props.variant === "option" ? "pl-3 pr-2 border-neutral-custom-100" : "pl-4 pr-3"} py-1
                ${(props.variant === "menu" && isOpened.value) ? "border-neutral-custom-100" : "border-neutral-custom-base"}
            `}
            onClick$={() => isOpened.value = !isOpened.value}
        >
            { props.variant === "option" ? (
                <Slot />
            ) : (
                <div class={`flex items-center gap-x-4 ${props.fillContainer ? "w-full" : "w-fit"}`}>
                    <Slot />
                </div>
            )}

            { props.variant === "option" ?
                (
                    <img src={Chevron} alt='Chevron Icon' class={`${isOpened.value ? "rotate-180" : "rotate-0"}`} height={24} width={24} />
                ) : (
                    <img src={`${isOpened.value ? Minus : Plus}`} alt='Plus Minus Icon' height={24} width={24} class="h-[24px] w-[24px] object-cover" />
                )
             }
        </label>
    );
});

Dropdown.Icon = component$(({ src }) => {
    return (
        <img 
            src={src}
            alt="Icon"
            class="min-h-[24px] min-w-[24px] rounded-[4px] aspect-square"
            height={24}
            width={24}
        />
    );
});

Dropdown.Items = component$(() => {
    const rootProps = useContext(DropdownContext);

    return (
        <div class={`
                flex bg-neutral-custom-base
                ${rootProps.fillContainer ? "w-full" : "w-fit"}
                ${
                    rootProps.variant === "option" ? 
                        "flex-col gap-y-3 py-2 px-3 rounded-[4px] border-[1.5px] border-neutral-custom-100" : 
                        "gap-x-6 px-4 py-3"
                }
                ${rootProps.variant === "option" && "z-10 absolute top-12"}
            `}
        >
            {rootProps.variant === "option" ? (
                <Slot />
            ) : (
                <div class="pl-3 w-full flex gap-x-6">
                    <span class="w-[1px] h-full block bg-neutral-custom-400" />
                    <div class="flex flex-col gap-y-4">
                        <Slot />
                    </div>
                </div>
            )}
        </div>
    );
});

Dropdown.Item = component$((props) => {
    const location = useLocation();
    const pathname = location.url.pathname.replace(/\/+$/, '') || '/';
    const rootProps = useContext(DropdownContext);

    if (rootProps.variant === "option") {
        return (
            <p
                class={`
                    p-1 text-neutral-custom-600 text-label-small sm:text-label-medium cursor-pointer rounded-[4px]
                    ${props.value === rootProps.currentValue ? "bg-neutral-custom-50" : "hover:font-medium"}    
                `}
                onClick$={() => {
                    rootProps.onClickOption$ && rootProps.onClickOption$(props.value);
                    props.onClick$ && props.onClick$(props.value);
                }}
            >
                <Slot />
            </p>
        );
    }
    return (
        <Link 
            class={`
                p-1 text-label-small sm:text-label-medium cursor-pointer rounded-[4px]
                ${pathname.includes(props.href as string) ? "text-blue-600" : "text-neutral-custom-600"}  
            `}
            href={props.href}>
            <Slot />
        </Link>
    );
});