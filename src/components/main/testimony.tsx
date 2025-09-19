import { component$ } from '@builder.io/qwik';

interface TestimonyProps {
    id: number;
    name: string;
    avatar: string;
    location: string;
    review: string;
    purchasedProducts: Array<{
        id: number;
        name: string;
    }>
}

export const Testimony = component$<{ data: TestimonyProps }>(({
    data: {
        id,
        name,
        avatar,
        location,
        review,
        purchasedProducts
    }
}) => {
    return (
        <article 
            id={`${id}`}
            class="py-9 px-6 bg-primary-base border-[3px] border-solid border-primary-50 flex flex-col gap-y-8 rounded-2xl"
        >
            <section class="flex flex-col gap-y-4">
                <figure class="flex flex-col gap-y-8">
                    <img src={avatar} alt={`${name} avatar`} height={100} width={100} class="h-[100px] w-[100px] object-cover rounded-full bg-primary-100" />

                    <figcaption class="font-lora font-semibold text-h2-small sm:text-h2-medium">
                        {name},&nbsp;{location}
                    </figcaption>
                </figure>

                <p class="font-work-sans italic text-neutral-custom-700 text-body-small sm:text-body-medium">
                    {review}
                </p>
            </section>

            <section class="flex flex-col gap-y-4 font-work-sans font-medium text-label-small sm:text-label-medium">
                <p class="text-neutral-custom-900">
                    Produk yang Dibeli
                </p>

                <ul class="flex flex-col gap-y-3 *:w-fit *:py-1.5 *:px-4 *:bg-primary-50 *:rounded-[4px] *:text-primary-600">
                    {purchasedProducts.map((product) => {
                        return (
                            <li key={product.id} id={`${product.id}`}>
                                {product.name}
                            </li>
                        );
                    })}
                </ul>
            </section>
        </article>
    );
})