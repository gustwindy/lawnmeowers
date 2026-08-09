import Image from "next/image";

import Section from "@/components/Section";

export default function About({ active }: { active: boolean }) {
	return (
		<Section centered={true} id="about" active={active}>
			<Image src="/cail.png" alt="logo" width={256} height={256} priority />
			<h1 className="text-4xl text-ctp-mauve">Lawn Meowers Council</h1>
			<p className="text-2xl">meowing commeownity :3</p>
		</Section>
	);
}
