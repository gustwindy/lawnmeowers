import Link from "next/link";

export default function Nav() {
	return (
		<nav>
			<ul>
				<li>
					<a href="#about">about</a>
				</li>
				<li>
					<a href="#members">members</a>
				</li>
				<li>
					<a href="#founders">founders</a>
				</li>
				<li>
					<Link href="/discord">discord</Link>
				</li>
			</ul>
		</nav>
	);
}
