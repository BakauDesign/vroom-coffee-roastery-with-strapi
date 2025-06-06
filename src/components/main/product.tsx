import { 
    component$,
} from '@builder.io/qwik';

import type {
    Component,
    HTMLAttributes
} from '@builder.io/qwik';

import { useNavigate } from '@builder.io/qwik-city';

import type { Products } from "~/interfaces";

import { Button } from './button';

import { formatRupiah, toSlug } from '~/lib/utils';

interface ProductsProps 
    extends Omit<Products,
        "highlight" |
        "stock" |
        "reviewId"
    > {

}

interface ChildProps
    extends HTMLAttributes<HTMLElement> {}

interface PricePackagingBlockProps
    extends Omit<HTMLAttributes<HTMLElement>, "id">,
            Omit<Products, 
                "id" |
                "name" |
                "description" |
                "photo" |
                "highlight" |
                "stock" |
                "reviewId" |
                "type"
            > {}

interface NameDescriptionBlockProps
    extends Omit<HTMLAttributes<HTMLElement>, "id">,
            Omit<Products, 
                "id" |
                "price" |
                "discount" |
                "discountPrice" |
                "photo" |
                "highlight" |
                "stock" |
                "weight" |
                "reviewId" |
                "type"
            > {}

interface NameDescriptionBlockComponent 
    extends Component<HTMLAttributes<HTMLElement>>
    {
        Name: Component<ChildProps>;
        Description: Component<ChildProps>;
}

interface ProductComponent extends Component<ProductsProps> {
    PricePackaging: Component;
    NameDescriptionBlock: NameDescriptionBlockComponent;
    Actions: Component;
}

export const Product: ProductComponent = component$((
    { id, name, description, type, price, discount, discountPrice, photo, weight }) => {
    const navigate = useNavigate();

    return (
        <section class="h-[620px] flex flex-col gap-y-8 rounded-[12px] bg-primary-base border-[3px] border-primary-50 overflow-hidden">
            <img
                class="h-[300px] w-full object-cover"
                height={400}
                width={400}
                src={photo}
                alt={name}
            />

            <section class="h-full px-5 pb-6 flex flex-col gap-y-6">
                <PricePackagingBlock
                    price={price}
                    weight={weight}
                    discount={discount}
                    discountPrice={discountPrice}
                />

                <NameDescriptionBlock
                    name={name}
                    description={description}
                />

                <Button
                    size='large'
                    variant='secondary'
                    fillContainer
                    onClick$={() => {
                        navigate(`
                            /products/${toSlug(type)}/${id}
                        `)
                    }}
                >
                    Lihat Produk
                </Button>
            </section>
        </section>
    );
}) as ProductComponent;

const PricePackagingBlock: Component<PricePackagingBlockProps> = component$((
    { price, discount, discountPrice, weight }) => {

    return (
        <section class="h-[48px] flex justify-between gap-x-6">
            <section class="flex flex-col">
                <h1 class="font-lora text-primary-700 font-bold text-h3-medium sm:text-h3-large">
                    {discount ? formatRupiah(discountPrice as number) : formatRupiah(price)}
                </h1>

                {discount && (
                    <section class="flex items-center gap-x-2">
                        <h1 class="font-lora line-through">
                            { formatRupiah(price) }
                        </h1>

                        <p class="py-0.5 px-1 font-open-sans font-semibold text-small-text-small sm:text-label-medium bg-red-50 text-red-700 rounded h-fit">
                            { discount }%
                        </p>
                    </section>
                )}
            </section>

            <p class="py-1 px-3 font-work-sans font-medium text-label-small sm:text-label-medium text-primary-base bg-primary-700 rounded h-fit">
                { weight }gr
            </p>
        </section>
    );
}) as Component<PricePackagingBlockProps>;

const NameDescriptionBlock: Component<NameDescriptionBlockProps> = component$((
    { name, description }) => {
    return (
        <article class="flex flex-col gap-y-4 overflow-hidden">
            <h1 class="whitespace-nowrap text-clip line-clamp-1 font-lora font-medium text-neutral-custom-800 text-h3-medium sm:text-h3-large">
                { name }
            </h1>

            <p class="text-ellipsis line-clamp-2 font-work-sans text-neutral-custom-700 text-body-small sm:text-body-medium">
                { description }
            </p>
        </article>
    );
});