"use client";

import Image from "next/image";

import Section from "@/components/Section";

import { useHash } from "../hooks/useHash";

export default function About() {
	const hash = useHash();
	console.log(hash);
	const isActive = (name: string) =>
		(name === "#about" && hash === "") || hash === name;

	return (
		<>
			<Section centered={true} id="about" active={isActive("#about")}>
				<Image
					src="/cail.png"
					alt="logo"
					width={256}
					height={256}
					loading="eager"
				/>
				<h1 className="text-4xl text-ctp-mauve">Lawn Meowers Council</h1>
				<p className="text-2xl">meowing commeownity :3</p>
			</Section>

			<Section id="members" active={isActive("#members")}>
				<h2 className="text-3xl">Members</h2>
				<p className="text-2xl">List of members</p>
			</Section>

			<Section id="founders" active={isActive("#founders")}>
				<h2 className="text-3xl">Founders</h2>
			</Section>

			<Section centered={true} id="discord" active={isActive("#discord")}>
				<h2 className="text-3xl mb-5">Discord</h2>

				<iframe
					src="https://discord.com/widget?id=1512271425723957399&theme=dark"
					width="350"
					height="500"
					title="Lawn Meowers Council"
					className="border-0"
					sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
				></iframe>
			</Section>
		</>
	);
}
