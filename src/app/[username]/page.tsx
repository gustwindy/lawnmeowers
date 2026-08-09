import { notFound } from "next/navigation";

import ProfileCard from "@/components/ProfileCard";
import profilesData from "@/data/profiles.json";
import type { Profile } from "@/types/profile";

export default async function ProfilePage({
	params,
}: {
	params: Promise<{ username: string }>;
}) {
	const { username } = await params;
	const profile = (profilesData.profiles as Profile[]).find(
		(p) => p.username === username,
	);

	if (!profile) notFound();

	return (
		<section className="flex-1 flex justify-center items-center flex-col">
			<ProfileCard profile={profile} expand={false} />
		</section>
	);
}
