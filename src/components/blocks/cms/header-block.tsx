import { 
    component$,
    Slot,
} from "@builder.io/qwik";

import type { 
    Component,
    ImgHTMLAttributes,
    HTMLAttributes 
} from "@builder.io/qwik";

interface ParagraphProps extends
    HTMLAttributes<HTMLParagraphElement> {}

interface HeaderComponent extends Component {
    Root: Component;
    Content: Component;
    Illustration: Component<ImgHTMLAttributes<HTMLImageElement>>;
    Detail: Component;
    Headline: Component<ParagraphProps>;
    SupportingHeadline: Component<ParagraphProps>;
    Actions: Component;
}

export const HeaderBlock = component$(() => {
    return <Slot />;
}) as HeaderComponent;

HeaderBlock.Root = component$(() => {
    return (
        <header class="flex flex-col xl:flex-row items-end justify-between gap-6 lg:gap-8 font-inter">
            <Slot />
        </header>
    );
});

HeaderBlock.Content = component$(() => {
    return (
        <section class="w-full xl:w-auto xl:grow-[2] flex flex-col md:flex-row md:items-end gap-4">
            <Slot />
        </section>
    );
});

HeaderBlock.Detail = component$(() => {
    return (
        <article class="flex flex-col gap-y-3">
            <Slot />
        </article>
    );
});

HeaderBlock.Illustration = component$((
    { ...props }) => {
    return (
        <img {...props} height={70} width={70} alt="Illustration" class="h-[70px] w-[70px] object-cover rounded-[12px]" />
    );
});

HeaderBlock.Headline = component$((
    { ...props }) => {
    return <h1 {...props} class="text-h3-small sm:text-h3-medium lg:text-h3-large font-semibold text-neutral-900"><Slot /></h1>;
});

HeaderBlock.SupportingHeadline = component$((
    { ...props }) => {
    return <h2 {...props} class="text-body-small sm:text-body-medium text-neutral-700"><Slot /></h2>;
});

HeaderBlock.Actions = component$(() => {
    return (
        <section class="w-full xl:w-auto xl:grow-[1] flex flex-col sm:flex-row items-end justify-end gap-4">
            <Slot />
        </section>
    );
});