    import {
        component$,
        createContextId,
        Slot,
        useContext,
        useContextProvider,
        useSignal
    } from '@builder.io/qwik';

    import type {
        Component,
        InputHTMLAttributes,
    } from '@builder.io/qwik';
    
    import UploadMinimalisticDark from "~/assets/Icons/Upload Minimalistic Dark.svg";
    import UploadMinimalisticLight from "~/assets/Icons/Upload Minimalistic Light.svg";

    interface UploadPhotoProps {
        disabled?: boolean;
    }

    interface FieldFileProps 
        extends InputHTMLAttributes<HTMLInputElement> 
        {
            currentImageUrl: string | null;
    }

    interface UploadPhotoComponent extends Component {
        Root: Component<UploadPhotoProps>;
        Header: Component;
        Label: Component;
        Option: Component;
        FieldFile: Component<FieldFileProps>;
        Message: Component;
    }

    const UploadPhotoContext = createContextId<UploadPhotoProps>('upload-file.context');

    export const UploadPhoto = component$(() => {
        return <Slot />;
    }) as UploadPhotoComponent;

    UploadPhoto.Root = component$((props) => {
        useContextProvider(UploadPhotoContext, props);

        return (
            <div class="w-full flex flex-col gap-y-2 font-inter text-cms-label-small sm:text-cms-label-medium">
                <Slot />
            </div>
        );
    });

    UploadPhoto.Header = component$(() => {
        return (
            <div class="flex items-center justify-between gap-x-6">
                <Slot />
            </div>
        );
    });

    UploadPhoto.Label = component$(() => {
        const props = useContext(UploadPhotoContext);

        return (
            <label class={`${props.disabled ? "text-neutral-400" : "text-neutral-950"} font-medium`}>
                <Slot />
            </label>
        );
    });

    UploadPhoto.Option = component$(() => {
        const props = useContext(UploadPhotoContext);

        return (
            <div class={`${props.disabled ? "text-neutral-400" : "text-neutral-500"}`}>
                <Slot />
            </div>
        );
    });

    UploadPhoto.FieldFile = component$<FieldFileProps>((props) => {
        const imageUrl = useSignal<string | null>(props.value?.toString() || null);
        const rootProps = useContext(UploadPhotoContext);

        return (
            <div class="h-[180px] w-[180px] bg-neutral-custom-base border-dashed border-[1.5px] border-neutral-200 rounded-[6px] flex items-center justify-between relative overflow-hidden">
                <input
                    id='upload-photo'
                    name={props.name}
                    type='file'
                    accept='.jpg,.jpeg,.png,.avif'
                    {...props}
                    disabled={rootProps.disabled || props.disabled}
                    
                    class="opacity-0"

                    onChange$={(e) => {
                        const file = (e.target as HTMLInputElement).files?.[0];

                        if (file) {
                            imageUrl.value = URL.createObjectURL(file);
                        }
                    }}
                />

                <label
                    for="upload-photo"
                    class={`
                        flex flex-col justify-center items-center gap-y-1.5 top-0 bottom-0 left-0 right-0 absolute bg-cover cursor-pointer
                        ${(props.currentImageUrl || imageUrl.value) ? "bg-none" : "bg-neutral-custom-base"} ${(props.currentImageUrl || imageUrl.value) && "grayscale"}
                    `}

                    style={{
                        backgroundImage: props.currentImageUrl && !imageUrl.value ? (
                            `url(https://vroom-coffee-roastery.pages.dev/media/${props.currentImageUrl})`
                        ) : (
                            imageUrl.value ? `url(${imageUrl.value})` : 'bg-neutral-custom-base'
                        )
                    }}
                >
                    <img
                        src={(props.currentImageUrl || imageUrl.value) ? UploadMinimalisticLight : UploadMinimalisticDark}
                        alt="Upload Minimalistic Icon"
                        height={24}
                        width={24}
                    />

                    <p class={`text-cms-label-small sm:text-cms-label-medium ${(props.currentImageUrl || imageUrl.value) ? "text-neutral-custom-base" : "text-neutral-custom-700"}`}>
                        {(props.currentImageUrl || imageUrl.value) ? "Click to change file" : "Click to select file"}
                    </p>
                </label>
            </div>
        );
    });

    UploadPhoto.Message = component$(() => {
        const props = useContext(UploadPhotoContext);

        return (
            <div q:slot="message" class={`${props.disabled && "text-neutral-400"}`}>
                <Slot />
            </div>
        );
    });