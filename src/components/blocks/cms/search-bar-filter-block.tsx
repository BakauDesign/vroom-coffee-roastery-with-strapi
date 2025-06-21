import { 
    component$,
    Slot,
    useSignal
} from "@builder.io/qwik";

import type {
    Component
} from "@builder.io/qwik";

import { Chips, type ChipsProps } from "~/components/cms/chips";

import { SearchBar, type SearchBarProps } from "~/components/cms/search-bar";

// interface SearchBarFilterBlockProps extends SearchBarProps {

// }

interface FilterProps 
    extends ChipsProps {
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
        <section class="flex flex-col gap-y-6">
            <Slot />
        </section>
    );
});

SearchBarFilterBlock.SearchBar = component$((
    { ...props }) => {
    return <SearchBar {...props} />
});

SearchBarFilterBlock.Filter = component$((
    { ...props }) => {
    const filterValues = useSignal(props.values);

    return (
        <section class="flex gap-8 flex-wrap">
            <Chips.Root
                name={props.label}
                onClick$={props.onClick$}
                currentValue={props.currentValue}
                disabled={props.disabled}
            >
                <Chips.Header>
                    <Chips.Label>
                        { props.label }
                    </Chips.Label>

                    {props.option && (
                        <Chips.Option>
                            { props.option }
                        </Chips.Option>
                    )}
                </Chips.Header>

                <Chips.Items>
                    {filterValues.value.length > 0 && filterValues.value.map((value) => {
                        return (
                            <Chips.Item {...props} key={value.id} value={value.label}>
                                { value.label }
                            </Chips.Item>
                        );
                    })}
                </Chips.Items>
            </Chips.Root>
        </section>
    );
});