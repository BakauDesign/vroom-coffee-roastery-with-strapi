import { component$ } from '@builder.io/qwik';

export const Gradient = component$<{ position: "top" | "bottom" }>(({
    position
}) => {
    return (
        <span class={`
            h-12 sm:h-[60px] lg:h-[100px] w-full absolute z-[1] 
            ${position === "top" 
                ? "top-o bg-[linear-gradient(180deg,#F8F1E7_0%,#FDF9F7_100%)]"
                : "bottom-0 bg-[linear-gradient(180deg,#FDF9F7_0%,#F8F1E7_100%)]"
            } 
        `} />
    );
});