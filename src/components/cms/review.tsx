import { component$, useSignal } from '@builder.io/qwik';

import type { HTMLAttributes, QRL } from '@builder.io/qwik';

import type { Reviews } from "~/interfaces";

import { Star } from '~/assets/Icons/Star';
import { Toggle } from './toggle';

interface ReviewsProps 
    extends Reviews, 
    Omit<HTMLAttributes<HTMLElement>,
        "id" 
    > {
        onActivatedReview$?: QRL<(value: any) => void>;
    }


export const Review = component$<ReviewsProps>((
    { name, location, rating, content, date, isHidden, onActivatedReview$ }) => {
    const state = useSignal(isHidden);

    return (
        <section
            class="py-9 px-6 relative bg-neutral-custom-base border-[1.5px] border-neutral-50 shadow-[4px_4px_16px_0px_rgba(178,178,178,0.10)] rounded-2xl font-inter flex flex-col gap-y-4"
        >
            <Toggle
                class="absolute top-6 right-6"
                size='large'
                value={state.value}
                onClick$={(value) => {
                    state.value = value;
                    onActivatedReview$?.(value);
                }}
            />

            <article class="flex flex-col gap-y-3">
                <h1 class="font-semibold text-cms-h3-small text-neutral-custom-900">
                    { name }, { location }
                </h1>

                <ul class="flex gap-x-2">
                    {Array.from({ length: rating }).map((_, index) => {
                        return <li key={index}><Star height={20} width={20} class="text-yellow-400" /></li>
                    })}
                </ul>
            </article>

            <p class="text-cms-body-small sm:text-cms-body-medium text-neutral-custom-700 italic">
                { content }
            </p>

            <p class="font-medium text-right text-cms-label-small sm:text-cms-label-medium text-neutral-custom-500">
                { date }
            </p>
        </section>
    );
});