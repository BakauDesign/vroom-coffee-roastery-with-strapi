    import {
        // $,
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
    Signal,
} from '@builder.io/qwik';

import { useLocation } from '@builder.io/qwik-city';
    
    import UploadMinimalisticDark from "~/assets/Icons/Upload Minimalistic Dark.svg";
    import UploadMinimalisticLight from "~/assets/Icons/Upload Minimalistic Light.svg";
import { isLocalhost } from '~/lib/utils';

    interface UploadPhotoProps {
        disabled?: boolean;
    }

    interface FieldFileProps 
        extends InputHTMLAttributes<HTMLInputElement> 
        {
            currentImageUrl?: string | null;
            loader?: Readonly<Signal<any>>;
            photo?: string;
            photoFile?: string;
            photoUrl?: string;
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
        const loc = useLocation();
        const imageUrl = useSignal<string | null>(props.value?.toString() || null);

        const loader = props.loader;
        const newLogoFile = useSignal<File | null>(null);
        const logoPreviewUrl = useSignal<string | null>(null);

        const photo = props.photo;

        const rootProps = useContext(UploadPhotoContext);

        return (
            <div class="h-[180px] w-[180px] bg-neutral-custom-base border-dashed border-[1.5px] border-neutral-200 rounded-[6px] flex items-center justify-between relative overflow-hidden">
                <input
                    id='upload-photo'
                    name={props.photoFile}
                    type='file'
                    accept='.jpg,.jpeg,.png,.avif'
                    disabled={rootProps.disabled || props.disabled}
                    
                    class="opacity-0"

                    onChange$={(e) => {
                        const file = (e.target as HTMLInputElement).files?.[0];
                        newLogoFile.value = file || null;

                        if (file) {
                            logoPreviewUrl.value = URL.createObjectURL(file); //loader error
                            imageUrl.value = URL.createObjectURL(file);
                        } else {
                            const oldLogoPath = loader?.value.photo;
                            if (oldLogoPath) {
                                logoPreviewUrl.value = `${isLocalhost(loc.url) ? "http://127.0.0.1:8788/media/" : "https://vroom-coffee-roastery.pages.dev/media/"}${photo}`;
                            } else {
                                logoPreviewUrl.value = null;
                            }
                        }
                    }}
                />

                <input type="hidden" name={props.photoUrl} value={photo} />

                <label
                    for="upload-photo"
                    class={`
                        flex flex-col justify-center items-center gap-y-1.5 top-0 bottom-0 left-0 right-0 absolute bg-cover cursor-pointer
                        ${(photo || imageUrl.value) ? "bg-none" : "bg-neutral-custom-base"} ${(photo || imageUrl.value) && "grayscale"}
                    `}

                    style={{
                        backgroundImage: !imageUrl.value ? (
                            `url(${isLocalhost(loc.url) ? "http://127.0.0.1:8788/media/" : "https://vroom-coffee-roastery.pages.dev/media/"}${photo})`
                        ) : (
                            imageUrl.value ? `url(${imageUrl.value})` : 'bg-neutral-custom-base'
                        )
                    }}
                >
                    <img
                        src={(photo || imageUrl.value) ? UploadMinimalisticLight : UploadMinimalisticDark}
                        alt="Upload Minimalistic Icon"
                        height={24}
                        width={24}
                    />

                    <p class={`text-cms-label-small sm:text-cms-label-medium ${(photo || imageUrl.value) ? "text-neutral-custom-base" : "text-neutral-custom-700"}`}>
                        {(photo || imageUrl.value) ? "Click to change file" : "Click to select file"}
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