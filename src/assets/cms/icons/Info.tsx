import { type PropsOf } from '@builder.io/qwik';

export function Info(props: PropsOf<'svg'>, key: string) {
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
            <circle cx="12" cy="12" r="10" stroke="#0EA5E9" stroke-width="1.5"/>
            <path d="M12 17V11" stroke="#0EA5E9" stroke-width="1.5" stroke-linecap="round"/>
            <circle cx="1" cy="1" r="1" transform="matrix(1 0 0 -1 11 9)" fill="#0EA5E9"/>
        </svg>
    );
}