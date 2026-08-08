export default function Section({
	id,
	active,
	children,
}: {
	id: string;
	active: boolean;
	children: React.ReactNode;
}) {
	return (
		<section
			id={id}
			className={`flex flex-col items-center justify-center ${active ? "" : "hidden"}`}
		>
			{children}
		</section>
	);
}
