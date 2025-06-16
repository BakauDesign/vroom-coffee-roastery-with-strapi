import { type PropsOf } from '@builder.io/qwik';

export function Error(props: PropsOf<'svg'>, key: string) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="none"
            viewBox="0 0 32 32"
            {...props}
            key={key}
        >
            <rect width="32" height="32" rx="16" fill="#FEE2E2"/>
            <path d="M21 11L11 21M21 21L11 11" stroke="#EF4444" stroke-width="2" stroke-linecap="round"/>
        </svg>
    );
}