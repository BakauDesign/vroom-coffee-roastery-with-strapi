import { insert, remove, type FormStore } from "@modular-forms/qwik";
import { $, useSignal } from "@builder.io/qwik";

export function usePackagingVariants(form: FormStore<any>) {
    const newVariantSize = useSignal('');
    const newVariantDiscount = useSignal<number | undefined | null>(undefined);
    const newVariantPrice = useSignal(1);
    const newVariantStock = useSignal(1);
    const newVariantWeight = useSignal(1);

    const addVariant = $(() => {
        insert(form, 'packaging_variant', {
            value: {
                size: '',
                weight: 250,
                price: 10000,
                stock: 10,
                discount: 0
            }
        });

        newVariantSize.value = '';
        newVariantDiscount.value = 0;
        newVariantPrice.value = 1;
        newVariantStock.value = 1;
        newVariantWeight.value = 1;
    });

    // Fungsi untuk menghapus varian berdasarkan indeksnya
    const removeVariant = $((index: number) => {
        remove(form, 'packaging_variant', { at: index });
    });

    return {
        addVariant,
        removeVariant,
        newVariantSize,
        newVariantDiscount,
        newVariantPrice,
        newVariantStock,
        newVariantWeight
    };
}