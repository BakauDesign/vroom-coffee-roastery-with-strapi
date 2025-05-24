import { component$ } from '@builder.io/qwik';
import type { QRL } from '@builder.io/qwik';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    perPage: number;
    perPageOptions?: number[];
    onPageChange$: QRL<(page: number) => void>;
    onPerPageChange$?: QRL<(value: number) => void>;
}

export const Pagination = component$<PaginationProps>(({
    currentPage,
    totalPages,
    perPage,
    perPageOptions = [10, 25, 50],
    onPageChange$,
    onPerPageChange$,
}) => {
  const getPageClass = (page: number) =>
    `font-inter px-3 py-1.5 border rounded ${
      page === currentPage
        ? 'bg-primary-base border-primary-100 font-semibold text-primary-500'
        : 'border-neutral-custom-100 bg-neutral-custom-base hover:bg-neutral-custom-50 text-neutral-custom-600'
    }`;

    return (
        <div class="flex flex-wrap items-end justify-between w-full gap-4 font-inter">
            <div class="flex flex-col items-center gap-4">
                <p class="text-cms-label-small sm:text-cms-label-medium font-medium text-neutral-custom-700">
                    Tampilkan per Halaman:
                </p>

                <div class="flex gap-2 text-neutral-700 text-cms-label-small sm:text-cms-label-medium *:py-1.5 *:px-3 *:w-[60px] *:h-[40px]">
                    {perPageOptions.map((option) => (
                        <button
                            key={option}
                            class={`px-3 py-1.5 border-[1.5px] rounded ${
                                perPage === option
                                ? 'bg-primary-base border-primary-100'
                                : 'border-neutral-custom-100 bg-neutral-custom-base hover:bg-neutral-custom-50'
                            }`}
                            onClick$={() => onPerPageChange$?.(option)}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>

        <div class="flex items-center gap-2 text-cms-label-small sm:text-cms-label-medium *:py-1.5 *:px-3 *:min-w-[40px] *:h-[40px] *:cursor-pointer">
            <button
                disabled={currentPage === 1}
                class="px-4 py-1.5 border-[1.5px] bg-neutral-custom-base border-neutral-custom-100 rounded text-neutral-custom-950 disabled:text-neutral-custom-400 disabled:cursor-not-allowed w-[48px]"
                onClick$={() => onPageChange$(currentPage - 1)}
            >
                ←
            </button>

            {[...Array(totalPages)].map((_, i) => {
                const page = i + 1;
                return (
                    <button
                        key={page}
                        class={getPageClass(page)}
                        onClick$={() => onPageChange$(page)}
                    >
                        {page}
                    </button>
                );
            })}

            <button
                disabled={currentPage === totalPages}
                class="px-4 py-1.5 border-[1.5px] bg-neutral-custom-base border-neutral-custom-100 rounded text-neutral-custom-950 disabled:text-neutral-custom-400 disabled:cursor-not-allowed w-[48px]"
                onClick$={() => onPageChange$(currentPage + 1)}
            >
                →
            </button>
        </div>
        </div>
    );
});
