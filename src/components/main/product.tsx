import { 
    component$,
    isDev,
} from '@builder.io/qwik';

import type {
    Component,
    HTMLAttributes
} from '@builder.io/qwik';

import { useNavigate } from '@builder.io/qwik-city';

import { Button } from './button';

import { formatRupiah, toSlug } from '~/lib/utils';

interface ProductsProps {
    documentId: string;
    nama: string;
    deskripsi: string;
    slug: string;
    foto: { url: string; };
    harga?: string;
    diskon?: number;
    harga_diskon?: string;
    berat?: string;
    type: string;
}

interface ChildProps
    extends HTMLAttributes<HTMLElement> {}

interface PricePackagingBlockProps
    extends Omit<HTMLAttributes<HTMLElement>, "id">,
            Omit<ProductsProps,
                "documentId" |
                "nama" |
                "deskripsi" |
                "slug" |
                "foto" |
                "type"
            >
    {}

interface NameDescriptionBlockProps
    extends Omit<HTMLAttributes<HTMLElement>, "id">,
            Omit<ProductsProps,
                "documentId" |
                "harga" |
                "harga_diskon" |
                "diskon" |
                "slug" |
                "foto" |
                "type" |
                "berat"
            >
    {}

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

export const Product: ProductComponent = component$(({
    nama,
    deskripsi,
    slug,
    foto,
    harga,
    harga_diskon,
    diskon,
    berat,
    type
}) => {
    const navigate = useNavigate();

    return (
        <section class="h-[620px] flex flex-col gap-y-8 rounded-[12px] bg-primary-base border-[3px] border-primary-50 overflow-hidden">
            <img
                class="h-[300px] w-full object-cover"
                height={400}
                width={400}
                src={isDev ? `http://localhost:1337${foto.url}` : `${foto.url}`}
                alt={nama}
            />

            <section class="h-full px-5 pb-6 flex flex-col gap-y-6">
                {harga ? (
                    <PricePackagingBlock
                        harga={harga}
                        diskon={diskon}
                        harga_diskon={harga_diskon}
                        berat={berat}
                    />
                ) : null}

                <NameDescriptionBlock
                    nama={nama}
                    deskripsi={deskripsi}
                />

                <Button
                    size='large'
                    variant='secondary'
                    fillContainer
                    onClick$={() => {
                        navigate(`
                            /products/${toSlug(type)}/${slug}
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
    { harga, diskon, harga_diskon, berat }) => {
    return (
        <section class="h-[48px] flex justify-between gap-x-6">
            <section class="flex flex-col">
                <h1 class="font-lora text-primary-700 font-bold text-h3-medium sm:text-h3-large">
                    {(harga && !diskon) ? formatRupiah(parseInt(harga)) : null}
                    {(diskon && harga_diskon) ? formatRupiah(parseInt(harga_diskon)) : null}
                </h1>

                {(diskon) ? (
                    <section class="flex items-center gap-x-2">
                        <h1 class="font-lora line-through">
                            { formatRupiah(parseInt(harga || "0")) }
                        </h1>

                        <p class="py-0.5 px-1 font-open-sans font-semibold text-small-text-small sm:text-label-medium bg-red-50 text-red-700 rounded h-fit">
                            { diskon }%
                        </p>
                    </section>
                ) : null}
            </section>

            <p class="py-1 px-3 font-work-sans font-medium text-label-small sm:text-label-medium text-primary-base bg-primary-700 rounded h-fit">
                { berat }gr
            </p>
        </section>
    );
}) as Component<PricePackagingBlockProps>;

const NameDescriptionBlock: Component<NameDescriptionBlockProps> = component$((
    { nama, deskripsi }) => {
    return (
        <article class="flex flex-col gap-y-4 overflow-hidden">
            <h1 class="whitespace-nowrap text-clip line-clamp-1 font-lora font-medium text-neutral-custom-800 text-h3-medium sm:text-h3-large">
                { nama }
            </h1>

            <p class="text-ellipsis line-clamp-2 font-work-sans text-neutral-custom-700 text-body-small sm:text-body-medium">
                { deskripsi }
            </p>
        </article>
    );
});