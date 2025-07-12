import { type PropsOf } from '@builder.io/qwik';

export function Done(props: PropsOf<'svg'>, key: string) {
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
            <circle cx="12" cy="12" r="10" stroke="#22C55E" stroke-width="1.5"/>
            <path d="M8.5 12.5L10.5 14.5L15.5 9.5" stroke="#22C55E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    );
}