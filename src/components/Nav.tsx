"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Nav() {
	const topbar_thing_button =
		"w-1/8 min-w-max h-max hover:bg-ctp-base hover:border-b-ctp-mauve border-b-4 transition-border duration-100"; // let me tell you how much I HATE tailwind
	const a = "size-full py-5 block";

	var [state, set] = useState("#about");
	const thing = (name: string) =>
		`${topbar_thing_button} ${state === name ? "border-b-ctp-mauve" : "border-b-transparent"}`;
	useEffect(() => {
		addEventListener("hashchange", () => {
			set(window.location.hash);
		});
	});
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
				<li className={thing("discord")}>
					<Link href="/discord" className={a}>
						discord
					</Link>
				</li>
			</ul>
		</nav>
	);
}
