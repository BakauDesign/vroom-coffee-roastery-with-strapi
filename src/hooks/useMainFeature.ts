import { InferInput } from 'valibot'; // eslint-disable-line @typescript-eslint/consistent-type-imports
import { insert, remove, type FormStore } from "@modular-forms/qwik";
import { $, useSignal } from "@builder.io/qwik";
import { MainFeatureSchema } from "~/schema/product"; // eslint-disable-line @typescript-eslint/consistent-type-imports

type MainFeature = InferInput<typeof MainFeatureSchema>;

export function useMainFeature(form: FormStore<any>) {
    const newRecEmoji = useSignal('');
    const newRecName = useSignal('');
    const newRecDescription = useSignal('');
    
    const addFeature = $(() => {
        const newRec: MainFeature = {
            emoji: newRecEmoji.value,
            name: newRecName.value,
            description: newRecDescription.value
        };

        if (
            newRec.emoji.trim() === '' ||
            newRec.name.trim() === '' ||
            newRec.description.trim() === ''
        ) {
            alert('Emoji, Nama dan deskripsi rekomendasi tidak boleh kosong!');
            return;
        }

        insert(form, 'tools_data.main_feature', {
            value: newRec,
        });
    });

    const removeFeature = $((index: number) => {
        remove(form, 'tools_data.main_feature', { at: index });
    });

    return {
        addFeature,
        removeFeature,
        newRecEmoji,
        newRecName,
        newRecDescription
    }
}