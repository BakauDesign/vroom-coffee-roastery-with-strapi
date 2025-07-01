import { type PropsOf } from '@builder.io/qwik';

export function DecreaseQuantity(props: PropsOf<'svg'>, key: string) {
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
            <rect x="0.5" y="0.5" width="31" height="31" rx="3.5" fill="#FDFAF7"/>
            <rect x="0.5" y="0.5" width="31" height="31" rx="3.5" stroke="#D9AF78"/>
            <path d="M20.8002 16L11.2002 16" stroke="#544E4A" stroke-width="1.5" stroke-linecap="round"/>
        </svg>       
    );
}