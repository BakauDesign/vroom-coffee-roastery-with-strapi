import { InferInput } from 'valibot'; // eslint-disable-line @typescript-eslint/consistent-type-imports
import { insert, remove, type FormStore } from "@modular-forms/qwik";
// import { ServingRecommendation } from "./useRoastedProducts"; // eslint-disable-line @typescript-eslint/consistent-type-imports
import { $, useSignal } from "@builder.io/qwik";
import { ServingRecomendationSchema } from "~/schema/product"; // eslint-disable-line @typescript-eslint/consistent-type-imports

type ServingRecommendation = InferInput<typeof ServingRecomendationSchema>;

export function useServingRecommendations(form: FormStore<any>) {
    const newRecName = useSignal('');
    const newRecDescription = useSignal('');
    
    const addRecommendation = $(() => {
        const newRec: ServingRecommendation = {
            name: newRecName.value,
            description: newRecDescription.value
        };

        if (newRec.name.trim() === '' || newRec.description.trim() === '') {
            alert('Nama dan deskripsi rekomendasi tidak boleh kosong!');
            return;
        }

        insert(form, 'roasted_beans_data.serving_recomendation', {
            value: newRec,
        });
    });

    const removeRecommendation = $((index: number) => {
        remove(form, 'roasted_beans_data.serving_recomendation', { at: index });
    });

    return {
        addRecommendation,
        removeRecommendation,
        newRecName,
        newRecDescription
    }
}