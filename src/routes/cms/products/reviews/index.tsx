import {
    component$,
    // useSignal
} from "@builder.io/qwik";

import {
    Link,
    // routeAction$,
    routeLoader$,
    // useNavigate
} from '@builder.io/qwik-city';

import { Breadcrumb } from "~/components/cms/breadcrumb";
// import { Button } from "~/components/main/button";
import { Separator } from "~/components/cms/separator";
import { Table } from "~/components/cms/table";

import { SearchBarFilterBlock as SearchBarFilter } from "~/components/blocks/cms/search-bar-filter-block";
import { HeaderBlock as Header } from "~/components/blocks/cms/header-block";
// import { Pagination } from "~/components/blocks/cms/pagination-block";

import { useReviewProductsCMS } from "~/hooks/useReviewProducts";
import { reviewsFilterOption } from "~/lib/filter-option";

import Green_Coffee_Beans from "~/assets/cms/icons/Green Coffee Beans.avif";

// import { roastedCoffeeBeans } from "~/assets/data/products";
import { getReviews } from "~/server/services/reviews";
import { calculateAverageRating } from "~/lib/utils";
// import { SearchBar } from "~/components/cms/search-bar";

export const useFilter = routeLoader$(async () => {
    return reviewsFilterOption;    
});

export const useReviews = routeLoader$(
    async (event) => {
        return await getReviews({ event });
    }
);

export default component$(() => {    
    const { category, rating } = useFilter().value;
    
    const { value: reviews } = useReviews();

    // const perPage = useSignal(10);

    const { categoryFilter, ratingFilter, searchKeyword } = useReviewProductsCMS();
    
    // const {
    //     brewingMethod,
    //     searchKeyword,
    //     currentPage,
    //     totalPages
    // } = useRoastedProducts({
    //     totalItems: products.data.length,
    //     initialPerPage: perPage.value,
    //     products: products.data.length
    // });

    return (
        <>
            {/* <section class="shrink-0 h-full min-h-full w-full flex flex-col gap-6 lg:flex-row relative"> */}
                <section class="h-full w-full *:h-full *:w-full overflow-hidden *:overflow-y-scroll *:overflow-x-hidden bg-neutral-custom-base pt-[124px] px-4 sm:px-6 lg:px-9 pb-6 sm:pb-9 lg:pb-12 lg:pt-12 *:flex *:flex-col *:gap-9">
                <section class="no-scrollbar">
                    <Breadcrumb.Root>
                        <Breadcrumb.Item href="/cms/products/reviews">
                            Products
                        </Breadcrumb.Item>

                        <Breadcrumb.Item visited>
                            Reviews
                        </Breadcrumb.Item>
                    </Breadcrumb.Root>

                    <Header.Root>
                        <Header.Content>
                            <Header.Illustration 
                                src={Green_Coffee_Beans}
                                alt="Green Coffee Beans"
                            />

                            <Header.Detail>
                                <Header.Headline>
                                    Ulasan Pelanggan
                                </Header.Headline>

                                <Header.SupportingHeadline>
                                    Kelola feedback untuk meningkatkan kualitas produk dan layanan.
                                </Header.SupportingHeadline>
                            </Header.Detail>
                        </Header.Content>
                    </Header.Root>

                    <Separator />

                    <SearchBarFilter.Root>
                        <SearchBarFilter.SearchBar
                            placeholder="Cari Produk..."
                            valueChange$={(value) => searchKeyword.value = value}
                        />

                        <div class="flex flex-wrap gap-8">
                            <SearchBarFilter.Filter
                                label="Kategori Produk"
                                currentValue={categoryFilter.value}
                                values={category}
                                onClick$={(value) => categoryFilter.value = value}
                            />

                            <SearchBarFilter.Filter
                                label="Rentang Rating"
                                currentValue={ratingFilter.value}
                                values={rating}
                                onClick$={(value) => ratingFilter.value = value}
                            />
                        </div>
                    </SearchBarFilter.Root>

                    {/* <Table.Root class="h-[500px] w-full rounded-[12px] bg-neutral-custom-base border-[1.5px] border-neutral-custom-50 border-separate border-spacing-0 overflow-hidden"> */}
                    <div class="min-h-[500px] overflow-y-auto no-scrollbar rounded-[12px] border border-neutral-custom-50">
                    <Table.Root class="w-full border-separate border-spacing-0">
                        <Table.Head>
                            <Table.Row>
                                <Table.Cell type="header" class="min-w-[250px]">Nama produk</Table.Cell>
                                <Table.Cell type="header" class="min-w-[180px]">Rating</Table.Cell>
                                <Table.Cell type="header" class="min-w-[150px]">Jumlah Ulasan</Table.Cell>
                                <Table.Cell type="header" class="min-w-[250px] max-w-[250px]">Ulasan Terbaru</Table.Cell>
                                <Table.Cell type="header" class="min-w-[150px]">Aksi</Table.Cell>
                            </Table.Row>
                        </Table.Head>

                        <Table.Body class="h-full w-full *:first:*:h-[150px] *:*:h-[150px] *:first:*:pt-5 *:last:*:pb-5">
                            {reviews.data.map((product) => {
                                return (
                                    <Table.Row key={product.id}>
                                        <Table.Cell class="min-w-[250px]">{product.name}</Table.Cell>

                                        <Table.Cell class="min-w-[180px]">
                                            {calculateAverageRating(product)}
                                        </Table.Cell>

                                        <Table.Cell class="min-w-[150px]">
                                            {product.review.length}
                                        </Table.Cell>

                                        <Table.Cell class="min-w-[250px] max-w-[250px]">
                                            <p class="text-neutral-custom-600 text-body-small sm:text-body-medium">
                                                {product.review.length ? product.review[0].content : "-"}
                                            </p>
                                        </Table.Cell>

                                        <Table.Cell class="min-w-[150px]">
                                            <Link 
                                                href={`/cms/products/reviews/${product.id}`}
                                                class="font-work-sans font-medium text-label-small sm:text-label-medium text-primary-400 cursor-pointer"
                                            >
                                                Lihat
                                            </Link>
                                        </Table.Cell>
                                    </Table.Row>     
                                )
                            })}                   
                        </Table.Body>
                    </Table.Root>
                    </div>
{/* 
                    <Pagination
                        currentPage={currentPage.value}
                        totalPages={totalPages}
                        perPage={10}
                        onPageChange$={(page) => currentPage.value = page}
                        onPerPageChange$={(val) => {
                            perPage.value = val;
                            currentPage.value = 1;
                        }}
                    /> */}
                </section>
                </section>
            {/* </section> */}
        </>
    );
});