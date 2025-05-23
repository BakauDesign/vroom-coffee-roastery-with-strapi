import { 
    component$,
    Slot
} from '@builder.io/qwik';

import type {
    Component,
    TableHTMLAttributes,
    HTMLAttributes,
} from '@builder.io/qwik';

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/lib/utils";

interface TableProps extends 
    TableHTMLAttributes<HTMLTableElement>,
    VariantProps<typeof tableVariants> {
        variant?: "default";
        size?: "default";
        // currentValue?: Signal<any>;
        // onClickItem$?: QRL<(value: any) => void>;
}

interface TableSectionProps
    extends HTMLAttributes<HTMLTableSectionElement> {}

interface TableRowProps
    extends HTMLAttributes<HTMLTableRowElement> {}

interface TableCellProps
    extends HTMLAttributes<HTMLTableCellElement> {
        type?: "header" | "content";
    }

interface TableComponent extends Component {
    Root: Component<TableProps>;
    Head: Component<TableSectionProps>;
    Body: Component<TableSectionProps>;
    Row: Component<TableRowProps>;
    Cell: Component<TableCellProps>;
}

const tableVariants = cva(
    "font-inter",
    {
        variants: {
            variant: {
                default: "",
            },
        size: {
            default: "",
        },
        },
            defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export const Table = component$<TableProps>(() => {
    return <Slot />
}) as TableComponent;

Table.Root = component$<TableProps>((
    { class: className, ...props }) => {
    return (
        <table class={`${cn(tableVariants({ className }))} relative`} {...props}>
            <Slot />
        </table>
    );
});

Table.Head = component$<TableSectionProps>((
    { class: className, ...props }) => {
    return (
        <thead class={`${cn(className)} sticky top-0 z-10 h-[45px]`} {...props}>
            <Slot />
        </thead>
    );
});

Table.Body = component$<TableSectionProps>((
    { class: className, ...props }) => {
    return (
        <tbody class={`${cn(className)} relative`} {...props}>
            <Slot />
        </tbody>
    );
});

Table.Row = component$<TableRowProps>((
    { class: className, ...props }) => {
    return (
        <tr class={`${cn(className)}`} {...props}>
            <Slot />
        </tr>
    );
});

Table.Cell = component$<TableCellProps>((
    { class: className, ...props }) => {
    return (
        <td 
            class={`
                py-1 px-4 h-[45px] 
                ${props.type === "header" ? 
                    "font-medium text-neutral-custom-700 bg-primary-base select-none text-cms-label-small sm:text-cms-label-medium" :
                    "text-neutral-600 text-cms-bodys-small sm:text-cms-bodys-medium"
                } 
                ${cn(className)}
            `} 
            {...props}>
            <Slot />
        </td>
    );
});
