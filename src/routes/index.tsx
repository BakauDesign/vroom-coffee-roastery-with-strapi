import { component$ } from "@builder.io/qwik";
import type { DocumentHead, RequestHandler } from "@builder.io/qwik-city";

export const onGet: RequestHandler = async ({ redirect }) => {
	throw redirect(302, "/coming-soon");
};

export default component$(() => {
	return (
		<>
		
		</>
	);
});

export const head: DocumentHead = {
	title: "Vroom Coffee Roastery",
	meta: [
		{
			name: "description",
			content: "Vroom Coffee Roastery berkomitmen untuk mengolah biji kopi dengan passion dan keahlian. Setiap batch roasting kami adalah perpaduan sains, seni, dan dedikasi untuk menghadirkan rasa yang konsisten dan memukau.",
		},
	],
};
