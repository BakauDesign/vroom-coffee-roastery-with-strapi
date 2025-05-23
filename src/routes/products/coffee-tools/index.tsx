import { component$, isDev } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";

// import { Header } from "~/components/main/header";

export const onGet: RequestHandler = async ({ redirect }) => {
    if (!isDev) {
        throw redirect(302, "/coming-soon");		
    }
};
export default component$(() => {
    return (
        <>
            <div>
                {/* <Header /> */}
            </div>
        </>
    );
});