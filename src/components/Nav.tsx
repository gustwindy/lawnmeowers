"use client";

import { useHash } from "@/hooks/useHash";

export default function Nav() {
	const topbarThingButton =
		"w-1/8 min-w-max h-max hover:bg-ctp-base hover:border-b-ctp-mauve border-b-4 transition-border duration-100"; // let me tell you how much I HATE tailwind
	const a = "size-full py-5 block";

	const hash = useHash();
	const thing = (name: string) =>
		`${topbarThingButton} ${hash === name ? "border-b-ctp-mauve" : "border-b-transparent"}`;

	return (
		<nav className="text-xl big-font bg-ctp-mantle">
			<ul className="flex w-full justify-center text-center gap-5 text-4xl">
				<li className={thing("#about")}>
					<a href="#about" className={a}>
						about
					</a>
				</li>
				<li className={thing("#members")}>
					<a href="#members" className={a}>
						members
					</a>
				</li>
				<li className={thing("#founders")}>
					<a href="#founders" className={a}>
						founders
					</a>
				</li>
				<li className={thing("#discord")}>
					<a href="#discord" className={a}>
						discord
					</a>
				</li>
			</ul>
		</nav>
	);
}
