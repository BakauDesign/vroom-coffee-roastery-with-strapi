import { type PropsOf } from '@builder.io/qwik';

export function ChevronUp(props: PropsOf<'svg'>, key: string) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            {...props}
            key={key}
        >
            <path d="M7 7H17V17" stroke="currentColor"/>
            <path d="M7 17L17 7" stroke="currentColor"/>
        </svg>
    );
}