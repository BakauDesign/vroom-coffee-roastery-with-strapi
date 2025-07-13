import {
    component$,
    // useSignal
} from "@builder.io/qwik";

import {
    routeAction$,
    // Link,
    // routeAction$,
    routeLoader$,
    valibot$,
    // useNavigate
} from '@builder.io/qwik-city';

import { Breadcrumb } from "~/components/cms/breadcrumb";
// import { Button } from "~/components/main/button";
import { Separator } from "~/components/cms/separator";
// import { Table } from "~/components/cms/table";

import { SearchBarFilterBlock as SearchBarFilter } from "~/components/blocks/cms/search-bar-filter-block";
import { HeaderBlock as Header } from "~/components/blocks/cms/header-block";
// import { Pagination } from "~/components/blocks/cms/pagination-block";

import { useReviewProductsCMS } from "~/hooks/useReviewProducts";
import { reviewsFilterOption } from "~/lib/filter-option";

import Green_Coffee_Beans from "~/assets/cms/icons/Green Coffee Beans.avif";

// import { roastedCoffeeBeans } from "~/assets/data/products";
import { changeReviewStatus, getReviewsByProductId } from "~/server/services/reviews";
import { Review } from "~/components/cms/review";
import { formatDateTime } from "~/lib/utils";
import { ChangeReviewStatusSchema } from "~/schema/review";
// import { calculateAverageRating } from "~/lib/utils";
// import { SearchBar } from "~/components/cms/search-bar";

export const useFilter = routeLoader$(async () => {
    return reviewsFilterOption;    
});

export const useReviews = routeLoader$(
    async (event) => {
        return await getReviewsByProductId({ event });
    }
);

export const useChangeReviewStatus = routeAction$(
    async (values, event) => {
        await changeReviewStatus({ values, event });
    },
    valibot$(ChangeReviewStatusSchema)
);

export default component$(() => {    
    const { rating } = useFilter().value;
    
    const { value: reviews } = useReviews();
    const { submit: changeReviewStatus } = useChangeReviewStatus();

    // const perPage = useSignal(10);

    const { ratingFilter } = useReviewProductsCMS();
    
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

                        <Breadcrumb.Item href="/cms/products/reviews">
                            Reviews
                        </Breadcrumb.Item>

                        <Breadcrumb.Item visited>
                            { reviews.data?.name }
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
                                    Ulasan untuk { reviews.data?.name }
                                </Header.Headline>

                                <Header.SupportingHeadline>
                                    Kelola feedback untuk meningkatkan kualitas produk dan layanan.
                                </Header.SupportingHeadline>
                            </Header.Detail>
                        </Header.Content>
                    </Header.Root>

                    <Separator />

                    <SearchBarFilter.Root>
                        <div class="flex flex-wrap gap-8">
                            <SearchBarFilter.Filter
                                label="Rentang Rating"
                                currentValue={ratingFilter.value}
                                values={rating}
                                onClick$={(value) => ratingFilter.value = value}
                            />
                        </div>
                    </SearchBarFilter.Root>

                    <section class="grid grid-cols-1 md:grid-cols-2 sm:gap-6 lg:gap-9">
                        {reviews.data?.review.map((review) => (
                            <Review
                                key={review.id}
                                id={review.id}
                                productId={review.product_id}
                                name={review.name}
                                location={review.location}
                                rating={review.rating}
                                content={review.content}
                                isHidden={!review.is_hidden}
                                date={formatDateTime(review.date.toISOString())}

                                onActivatedReview$={() => changeReviewStatus({
                                    id: review.id,
                                    is_hidden: review.is_hidden
                                })}
                            />
                        ))}
                    </section>
                </section>
                </section>
            {/* </section> */}
        </>
    );
});