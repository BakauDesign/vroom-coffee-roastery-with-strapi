import { type PropsOf } from '@builder.io/qwik';

export function ChevronDown(props: PropsOf<'svg'>, key: string) {
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
            <path d="M7.19922 14.9001L11.9992 10.1001L16.7992 14.9001" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    );
}
