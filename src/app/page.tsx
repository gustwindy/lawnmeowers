"use client";

import About from "@/components/sections/About";
import Discord from "@/components/sections/Discord";
import Founders from "@/components/sections/Founders";
import Members from "@/components/sections/Members";

import { useHash } from "../hooks/useHash";

export default function Home() {
	const hash = useHash();
	const isActive = (name: string) =>
		(name === "#about" && hash === "") || hash === name;

	return (
		<>
			<About active={isActive("#about")} />
			<Members active={isActive("#members")} />
			<Founders active={isActive("#founders")} />
			<Discord active={isActive("#discord")} />
		</>
	);
}
