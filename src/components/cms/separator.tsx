import { component$ } from '@builder.io/qwik';

export const Separator = component$(() => {
    return <div aria-label='separator' class="bg-neutral-custom-50 w-full h-[1.5px]" />;
});