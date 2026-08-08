"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Nav() {
	const anim_bottom =
		"before:absolute before:-z-1 before:w-full before:bottom-0 before:left-0 before:h-0 hover:before:h-1 before:transition-h before:duration-200 before:bg-ctp-mauve";
	const topbar_thing_button = `relative z-0 w-1/8 min-w-max h-max hover:bg-ctp-base hover:text-ctp-text transition-border duration-100 ${anim_bottom}`; // let me tell you how much I HATE tailwind
	const a = "size-full py-5 block";

	var [state, set] = useState("#about");
	const thing = (name: string) =>
		`${topbar_thing_button} ${state === name ? "before:h-1" : ""}`;
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
