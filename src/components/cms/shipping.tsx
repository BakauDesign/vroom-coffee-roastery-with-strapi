import { 
	component$,
	Slot,
    createContextId,
    useContextProvider,
    useContext
} from '@builder.io/qwik';

import type { QRL, Component, Signal, HTMLAttributes, ImgHTMLAttributes } from '@builder.io/qwik';

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/lib/utils";

interface ShippingProps extends 
	HTMLAttributes<HTMLElement>,
	VariantProps<typeof shippingVariants> {
		variant?: "default";
		size?: "default";
		currentValue?: Signal<any>;
		onClickItem$?: QRL<(value: any) => void>;
}

interface ListProps extends HTMLAttributes<HTMLElement> {}
interface ItemProps extends HTMLAttributes<HTMLElement> {
    value: string;
}

interface NameProps extends 
    HTMLAttributes<HTMLParagraphElement> {
    name: string;
}

interface CostProps extends 
    HTMLAttributes<HTMLParagraphElement> {
    cost: number;
}

interface ShippingComponent extends Component {
	Root: Component<ShippingProps>;
    List: Component<ListProps>;
    Item: Component<ItemProps>;    
	Logo: Component<ImgHTMLAttributes<HTMLImageElement>>;
	Detail: Component;
	Name: Component<NameProps>;
	Cost: Component<CostProps>;
}

const ShippingContext = createContextId<ShippingProps>('shipping.context');

const shippingVariants = cva(
	"font-inter",
	{
		variants: {
			variant: {
				default: "w-fit py-4 pl-4 pr-5 flex items-center gap-x-4 rounded-[12px] bg-neutral-custom-base border-[1.5px] cursor-pointer",
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

export const Shipping = component$<ShippingProps>(() => {
	return <Slot />;
}) as ShippingComponent;

Shipping.Root = component$<ShippingProps>((
	{ class: className, ...props }) => {
    useContextProvider(ShippingContext, props);

	return (
		<div
			class={`
				${cn(className)}
			`}
			{...props}
		>
			<Slot />
		</div>
	)
});

Shipping.List = component$<ShippingProps>((
	{ class: className, ...props }) => {	
	return (
		<div
			class={`
				${cn(className)}
			`}
			{...props}
		>
			<Slot />
		</div>
	)
});

Shipping.Detail = component$(
    () => {
    return (
        <div class="flex flex-col gap-y-2">
            <Slot />
        </div>
    );
});

Shipping.Item = component$((
    { class: className, value, ...props }) => {
    const { currentValue, onClickItem$ } = useContext(ShippingContext);

    return (
        <div 
            class={`
                ${cn(shippingVariants({ className }))}
                ${value === currentValue?.value ? 
                    " border-neutral-custom-200 saturate-100" : "border-neutral-custom-50 saturate-50"}
            `}

            onClick$={() => {
                if (onClickItem$) {
                    onClickItem$(value);
                }
            }}

            {...props}
        >
            <Slot />
        </div>
    );
});

Shipping.Logo = component$((
    { ...props }) => {
    return (
        <img {...props} class="h-[50px] w-[50px] object-contain rounded-[4px]" />
    );
});

Shipping.Name = component$(
    ({ ...props }) => {
    return (
        <h1 
            class={`
                text-cms-label-small sm:text-cms-label-medium text-neutral-custom-800 font-medium
                ${cn(props.class)}
            `}
            {...props}>
            { props.name }
        </h1>
    );
});

Shipping.Cost = component$(
    ({ ...props }) => {
    return (
        <h1 
            class={`
                text-cms-label-extra-small sm:text-cms-label-medium text-neutral-custom-700
                ${cn(props.class)}
            `}
            {...props}>
            Rp. { props.cost }
        </h1>
    );
});
