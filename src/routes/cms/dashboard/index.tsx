import { component$ } from "@builder.io/qwik";
// import { routeLoader$ } from "@builder.io/qwik-city";
// import { Dropdown } from "~/components/cms/dropdown";
// import { Sidebar } from "~/components/cms/sidebar";
// import { DropdownStatus } from "~/components/cms/dropdown-status";


// import { routeLoader$ } from '@builder.io/qwik-city';

// import InfoIcon from "~/assets/Icons/Info Circle.svg";
// import BankNoteIcon from "~/assets/Icons/Banknote 3.svg";
// import BoxIcon from "~/assets/Icons/Box.svg";
// import CloseCircleIcon from "~/assets/Icons/Close Circle.svg";
// import DeliveryIcon from "~/assets/Icons/Delivery.svg";
// import CheckCircleIcon from "~/assets/Icons/Check Circle.svg";
// import { Shipping } from "~/components/cms/shipping";
// import { Toggle } from "~/components/cms/toggle";
// import { UploadPhoto } from "~/components/cms/upload-photo";
// import { Product } from "~/components/cms/product";
// import { Review } from "~/components/cms/review";
// import { Review } from "~/components/main/review";

// export const useUserProfile = routeLoader$(async () => {
//     return {
//         avatar: "https://i.pinimg.com/736x/36/70/ca/3670ca173dce942570e4c340d9323a3a.jpg",
//         name: "Aulia Azahra",
//         role: "Admin"
//     };
// });

// export const useBucketLoader = routeLoader$(async ({ platform }) => {
//     if (!platform?.env?.BUCKET) {
//         console.error("R2 Bucket binding BUCKET not found on platform.env");
//         return null;
//     }

//     // const object = await platform.env.BUCKET.get("vroom-coffee-roastery/25253917747321e3a120cea41140ecc7.jpg");
//     const object = await platform.env.BUCKET.get("25253917747321e3a120cea41140ecc7.jpg");

//     if (!object) {
//         console.warn("Object not found");
//     } else {
//         console.info("Object found:", object);
//     }
// });

export default component$(() => {
    // const wahabi = useSignal("Wahabi 1");
    // const orderStatus = useSignal("Menunggu Konfirmasi");
    // const user = useUserProfile();
    // const shipping = useSignal("JNE");

    // const activeShipping = useSignal({
    //     JNE: true,
    //     JNT: false,
    //     Si_Cepat: false,
    //     Go_Send: true,
    // });
    // const menu = useSignal(true);

    return (
        <>
            {/* <section class="shrink-0 h-fit min-h-full w-full flex flex-col gap-6 lg:flex-row relative"> */}

                {/* <Sidebar /> */}

                <section class="h-full w-full bg-neutral-custom-base px-4 sm:px-6 lg:px-9 pb-6 sm:pb-9 lg:pb-12 pt-[124px]"> 
                    <div class="py-6 px-12 bg-blue-300">
                        <h1 class="text-4xl text-center">
                            YOU'RE IN DASHBOARD
                        </h1>
                    </div>
                </section>
            {/* </section> */}
        </>
    );
});