import { 
	component$,
	Slot,
	createContextId,
	useContextProvider,
	useContext,
	useSignal
} from '@builder.io/qwik';

import type {
	QRL,
	Signal,
	Component,
	ButtonHTMLAttributes,
	LabelHTMLAttributes
} from '@builder.io/qwik';

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/lib/utils";

import sortVerticalIcons from "~/assets/Icons/sort-vertical-01.svg"

interface DropdownStatusProps extends 
	ButtonHTMLAttributes<HTMLElement>,
	VariantProps<typeof dropdownStatusVariants> {
		variant?: "default";
		size?: "default";
		currentValue?: any;
		onClickItem$?: QRL<(value: any) => void>;
}

interface TriggerProps extends 
	LabelHTMLAttributes<HTMLLabelElement> 
{}

interface ItemsProps extends 
	ButtonHTMLAttributes<HTMLButtonElement>
{}

interface ItemProps extends 
	ButtonHTMLAttributes<HTMLButtonElement> 
{}

interface DropdownStatusComponent extends Component {
	Root: Component<DropdownStatusProps>;
	Trigger: Component<TriggerProps>;
	Items: Component<ItemsProps>;
	Item: Component<ItemProps>;
}

interface DropdownContext
	extends DropdownStatusProps {
		state: Signal<any>;
}

const dropdownStatusVariants = cva(
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

const DropdownStatusContext = createContextId<DropdownContext>('dropdown.context');

const DropdownContentContext = createContextId<{ isOpened: Signal<boolean> }>('dropdown-content.context');

export const DropdownStatus = component$<DropdownStatusProps>(() => {
	return <Slot />;
}) as DropdownStatusComponent;

DropdownStatus.Root = component$<DropdownStatusProps>((
	{ class: className, variant, size, ...props }) => {
	const state = useSignal(props.currentValue);
	const isOpened = useSignal(false);

	useContextProvider(DropdownStatusContext, { ...props, state });
	useContextProvider(DropdownContentContext, { isOpened });
	
	return (
		<div
			class={`
				relative flex flex-col transition-all duration-300
				${cn(dropdownStatusVariants({ variant, size, className }))}	
				
			`}
			{...props}
		>
			<Slot />
			{isOpened.value && (
				<div 
					onClick$={() => isOpened.value = false}
					class={`
						fixed top-0 left-0 right-0 bottom-0
					`} 
				/>
			)}
		</div>
	)
});

DropdownStatus.Trigger = component$<TriggerProps>((
	{ ...props }) => {
	const { state } = useContext(DropdownStatusContext);
	const { isOpened } = useContext(DropdownContentContext);

	return (
		<label 
			class={`
				flex items-center gap-3 w-fit select-none cursor-pointer
				py-2 px-3 bg-neutral-custom-base border-[1.5px] border-neutral-custom-200 rounded-[12px]
				text-neutral-custom-700 text-cms-label-small sm:text-cms-label-medium font-medium	
			`}
			onClick$={() => isOpened.value = !isOpened.value}
			{...props}>
			<img src={sortVerticalIcons} alt="sortVerticalIcons" height={24} width={24} />

			<p>
				{ state.value }
			</p>
		</label>
	);
});

DropdownStatus.Items = component$<ItemsProps>((
	{ class: className }) => {
	const contentRef = useSignal<HTMLElement>();
	const { isOpened } = useContext(DropdownContentContext);

	return (
		<div
			class={`
				overflow-x-hidden overflow-y-scroll transition-all duration-300 absolute z-10 top-8 p-3 rounded-2xl flex flex-wrap gap-4 w-[360px] bg-neutral-custom-base border-neutral-100
				${isOpened.value ? "border-[1.5px] opacity-100" : "opacity-0"}
				${cn(dropdownStatusVariants({ className }))}
			`}
			style={{
                height: isOpened.value 
                    ? `${contentRef.value?.scrollHeight}px` 
                    : '0px'
            }}

            ref={contentRef}
		>
			<Slot />
		</div>
	);
	
});

DropdownStatus.Item = component$<ItemProps>((
	{ class: className, value }) => {
	const { currentValue, onClickItem$, state } = useContext(DropdownStatusContext);
	const { isOpened } = useContext(DropdownContentContext);

	return (
		<div
			aria-value={value}
			onClick$={() => {
				if (value !== currentValue?.value) {
					state.value = value;
					onClickItem$ && onClickItem$(value);
					isOpened.value = false;
				}
			}}
			class={`
				w-fit py-2 px-3 rounded-[12px] flex-wrap gap-3 items-center select-none cursor-pointer
				${cn(dropdownStatusVariants({ className }))}
				${state.value === value ? "hidden" : "flex"}
				text-label-small sm:text-label-medium font-medium
			`}
		>
			<Slot />
		</div>
	);
});