"use client";

import { useHash } from "@/hooks/useHash";

export default function Nav() {
	const animBottom =
		"before:absolute before:-z-1 before:w-full before:bottom-0 before:left-0 before:h-0 hover:before:h-1 before:transition-h before:duration-200 before:bg-ctp-mauve";
	const topbarThingButton = `relative z-0 w-1/8 min-w-max h-max hover:bg-ctp-base hover:text-ctp-text transition-border duration-100 ${animBottom}`; // let me tell you how much I HATE tailwind
	const a = "size-full py-5 block";

	const hash = useHash();
	const thing = (name: string) =>
		`${topbarThingButton} ${hash === name ? "text-ctp-mauve before:h-1" : ""}`;

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
