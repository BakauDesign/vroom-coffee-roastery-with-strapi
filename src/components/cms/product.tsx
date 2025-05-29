import { component$, useSignal } from '@builder.io/qwik';

import type { HTMLAttributes, QRL } from '@builder.io/qwik';

import type { Products } from "~/interfaces";

import { formatRupiah } from '~/lib/utils';

import { Checkbox } from '~/assets/Icons/Checkbox';
import { CheckboxFilled } from '~/assets/Icons/CheckboxFilled';

interface ProductsProps 
    extends Omit<Products,
        "highlight" |
        "stock" |
        "reviewId" |
        "description" |
        "reviewId" |
        "type"
    >, Omit<HTMLAttributes<HTMLElement>,
        "id"
    > {
        isSelected?: boolean;
        onClickProduct$?: QRL<(value: any) => void>;
    }

export const Product = component$<ProductsProps>((
    { name, price, discount, discountPrice, photo, weight, isSelected = false, onClickProduct$ }) => {
    const state = useSignal(isSelected);

    return (
        <section
            class="font-inter flex items-center gap-x-6 cursor-pointer"

            onClick$={() => {
                state.value = !state.value;
                onClickProduct$ && onClickProduct$(state.value);
            }}
        >
            {state.value ? (
                <CheckboxFilled class={"h-[24px] w-[24px] text-green-500"} stroke-width={1.5} />
                
            ) : (
                <Checkbox class={"h-[24px] w-[24px] text-neutral-custom-400"} stroke-width={1.5} />
            )}

            <img
                class="h-[100px] w-[100px] object-cover rounded-[6px]"
                height={200}
                width={200}
                src={photo}
                alt={name}
            />

            <section class="w-full flex flex-col gap-y-3 pr-4 pb-2">
                <h1 class="text-cms-label-small sm:text-cms-label-medium text-neutral-custom-900">
                    { name }
                </h1>

                <section class="flex items-center justify-between gap-x-6">
                    <article>
                        <h1 class="text-neutral-custom-700 font-medium text-cms-label-small sm:text-cms-label-medium">
                            { discount ? formatRupiah(discountPrice as number) : formatRupiah(price) }
                        </h1>

                        {discount && (
                            <section class="flex items-center gap-x-2">
                                <h1 class="line-through text-cms-label-small sm:text-cms-label-small text-neutral-custom-600">
                                    { formatRupiah(price) }
                                </h1>

                                <p class="py-0.5 px-1 text-cms-label-extra-small font-medium bg-red-50 text-red-700 rounded h-fit">
                                    { discount }%
                                </p>
                            </section>
                        )}
                    </article>

                    {weight > 0 && (
                        <p class="py-0.5 px-1.5 bg-neutral-custom-700 text-neutral-custom-base text-cms-label-extra-small sm:text-cms-label-medium font-medium rounded-[2px]">
                            { weight }g
                        </p>
                    )}
                    
                </section>
            </section>
        </section>
    );
});