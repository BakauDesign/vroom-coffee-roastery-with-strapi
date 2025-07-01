import {
    component$,
    Slot
} from '@builder.io/qwik';

import type { QRL, Component } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { isLocalhost } from '~/lib/utils';

interface ShippingProps {
    selected?: boolean;
    disabled?: boolean;
    onClick$?: QRL<() => void>;
}

interface ShippingComponent extends Component {
    Root: Component<ShippingProps>;
    Logo: Component<{ src?: string} >;
    Detail: Component;
    Name: Component;
    Cost: Component;
}

export const Shipping = component$(() => {
    return <Slot />;
}) as ShippingComponent;

Shipping.Root = component$((props) => {
    return (
        <figure 
            {...props}
            class={`
                py-4 px-5 min-w-[180px] bg-primary-base rounded-[12px] flex gap-x-6 items-center cursor-pointer
                border-2 ${props.selected ? "border-primary-200" : "border-neutral-200"}
            `}>
            <Slot />
        </figure>
    );
});

Shipping.Logo = component$(({ src }) => {
    const loc = useLocation();
    return <img src={isLocalhost(loc.url) ? `http://127.0.0.1:8788/media/${src}` : `https://vroom-coffee-roastery.pages.dev/media/${src}`} alt="Logo" height={60} width={60} class="h-[60px] w-[60px] object-contain" />;
});

Shipping.Detail = component$(() => {
    return (
        <figcaption class="flex flex-col gap-y-3">
            <Slot />
        </figcaption>
    );
});


Shipping.Name = component$(() => {
    return (
        <h1 class="text-neutral-800 text-h3-small font-medium font-lora">
            <Slot />
        </h1>
    );
});

Shipping.Cost = component$(() => {
    return (
        <h2 class="text-primary-700 text-label-small sm:text-label-medium font-medium font-work-sans">
            <Slot />
        </h2>
    );
});