import { component$ } from "@builder.io/qwik";
import { RequestHandler } from "@builder.io/qwik-city";

export const onGet: RequestHandler = async ({ redirect }) => {
    throw redirect(302, "/coming-soon");
};

export default component$(() => {
    return (
        <>
        
        </>
    );
});