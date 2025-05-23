import {
    component$,
    Slot
} from '@builder.io/qwik';

import type { Component } from '@builder.io/qwik';

import type { LinkProps } from '@builder.io/qwik-city';

import { Link } from '@builder.io/qwik-city';

import SlashForward from "~/assets/Icons/slash-forward.svg";

interface BreadcrumbProps extends LinkProps {
    disabled?: boolean;
    visited?: boolean;
}

interface BreadcrumbComponent extends Component {
    Root: Component;
    Item: Component<BreadcrumbProps>;
}

export const Breadcrumb = component$(() => {
    return <Slot />;
}) as BreadcrumbComponent;

Breadcrumb.Root = component$(() => {
    return (
        <div class="w-full flex flex-row flex-wrap gap-3 font-inter *:flex *:items-center *:gap-x-2 font-medium text-cms-label-small sm:text-cms-label-medium">
            <Slot />
        </div>
    );
})

Breadcrumb.Item = component$<BreadcrumbProps>((props) => {
    return (
        <Link {...props} 
            class={`${(props.visited && !props.disabled) ? "text-blue-600" : "text-neutral-custom-600"} ${props.disabled && "text-neutral-custom-400"}`}
        >
            <Slot /> { props.href && <img src={SlashForward} alt="Slash Icon Forward" height={24} width={24} /> }
        </Link>
    );
});