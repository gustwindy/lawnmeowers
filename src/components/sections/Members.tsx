import Section from "@/components/Section";

export default function Members({ active }: { active: boolean }) {
	return (
		<Section id="members" active={active}>
			<h2 className="text-3xl">Members</h2>
			<p className="text-2xl">List of members</p>
		</Section>
	);
}
