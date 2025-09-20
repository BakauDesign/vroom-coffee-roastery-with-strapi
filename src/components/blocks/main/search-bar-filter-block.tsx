import { 
    component$,
    Slot,
    useSignal
} from "@builder.io/qwik";

import type {
    Component
} from "@builder.io/qwik";

import { SearchBar, type SearchBarProps } from "~/components/main/search-bar";
import { RadioButtonGroup, type RadioButtonGroupProps } from "~/components/main/radio-button";

interface FilterProps 
    extends RadioButtonGroupProps
    {
        label: string;
        option?: string;
        values: Array<any>;
}

interface SearchBarFilterBlockComponent extends Component {
    Root: Component;
    SearchBar: Component<SearchBarProps>;
    Filter: Component<FilterProps>;
}

export const SearchBarFilterBlock = component$(() => {
    return <Slot />;
}) as SearchBarFilterBlockComponent;

SearchBarFilterBlock.Root = component$(() => {
    return (
        <section class="flex flex-col-reverse md:flex-row-reverse gap-6">
            <Slot />
        </section>
    );
});

SearchBarFilterBlock.SearchBar = component$((
    { ...props }) => {
    return <SearchBar {...props} class="w-full max-w-[400px]" />
});

SearchBarFilterBlock.Filter = component$((
    { ...props }) => {
    const filterValues = useSignal(props.values);

    return (
        <section class="flex flex-col gap-8 flex-wrap">
            <RadioButtonGroup.Root
                onClickOption$={props.onClickOption$}
                currentValue={props.currentValue}
                disabled={props.disabled}
                class="flex-col xl:flex-row gap-6"
            >
                <RadioButtonGroup.Label class="min-w-[200px]">
                    { props.label }
                </RadioButtonGroup.Label>

                <RadioButtonGroup.Items class="gap-6 gap-y-3 flex-wrap">
                    {filterValues.value.length > 0 && filterValues.value.map((value) => {
                        return (
                            <RadioButtonGroup.Item key={value.id} value={value.label}>
                                { value.label }
                            </RadioButtonGroup.Item>
                        );
                    })}
                </RadioButtonGroup.Items>
            </RadioButtonGroup.Root>
        </section>
    );
});