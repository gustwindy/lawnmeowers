import Section from "@/components/Section";

export default function Founders({ active }: { active: boolean }) {
	return (
		<Section id="founders" active={active}>
			<h2 className="text-3xl">Founders</h2>
		</Section>
	);
}
