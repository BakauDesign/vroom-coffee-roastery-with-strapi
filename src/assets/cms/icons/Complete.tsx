import { type PropsOf } from '@builder.io/qwik';

export function Complete(props: PropsOf<'svg'>, key: string) {
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
            <rect width="32" height="32" rx="16" fill="#DCFCE7"/>
            <path d="M20.8002 12.3999L13.6407 19.5999L11.2002 17.1456" stroke="#16A34A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    );
}