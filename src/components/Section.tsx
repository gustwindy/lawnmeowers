export default function Section({
	id,
	active,
	children,
	centered,
}: {
	id: string;
	active: boolean;
	children: React.ReactNode;
	centered?: boolean;
}) {
	return (
		<section
			id={id}
			className={`${centered ? "flex-1" : ""} flex flex-col items-center justify-center ${active ? "" : "hidden"}`}
		>
			{children}
		</section>
	);
}
