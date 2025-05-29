import { component$ } from '@builder.io/qwik';

import type { HTMLAttributes } from '@builder.io/qwik';

import type { Reviews } from "~/interfaces";

import { Star } from '~/assets/Icons/Star';

interface ReviewsProps 
    extends Omit<Reviews,
        "isHidden"
    >, 
    Omit<HTMLAttributes<HTMLElement>,
        "id" 
    > {}


export const Review = component$<ReviewsProps>((
    { name, location, rating, content, date }) => {

    return (
        <section
            class="p-6 bg-primary-base border-[3px] border-primary-50 shadow-[4px_4px_16px_0px_rgba(178,178,178,0.10)] rounded-[12px] flex flex-col gap-y-6"
        >
            <section class="flex flex-col gap-y-2">
                <article class="flex flex-col gap-y-3">
                    <h1 class="font-lora text-h3-small text-neutral-custom-900">
                        { name }, { location }
                    </h1>

                    <ul class="flex gap-x-2">
                        {Array.from({ length: rating }).map((_, index) => {
                            return <li key={index}><Star height={20} width={20} class="text-yellow-400" /></li>
                        })}
                    </ul>
                </article>

                <p class="font-work-sans text-body-small sm:text-body-medium text-neutral-custom-700">
                    { content }
                </p>
            </section>

            <p class="font-work-sans font-medium text-right text-label-small sm:text-label-medium text-neutral-custom-600">
                { date }
            </p>
        </section>
    );
});