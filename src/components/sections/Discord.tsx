import Section from "@/components/Section";

export default function Discord({ active }: { active: boolean }) {
	return (
		<Section centered={true} id="discord" active={active}>
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
	);
}
