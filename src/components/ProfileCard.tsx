import Image from "next/image";

import type { Profile } from "@/types/profile";

export default function ProfileCard({ profile }: { profile: Profile }) {
	return (
		<div className="flex flex-col items-center justify-center">
			<Image
				src={`/avatars/${profile.username}.jpg`}
				alt={profile.displayName}
				width={128}
				height={128}
				priority
			/>
			<h2>{profile.displayName}</h2>
			<p>{profile.username}</p>
			<p>{profile.bio}</p>

			<ul>
				{profile.socials.map((social) => (
					<li key={social.platform}>
						<a href={social.url}>{social.handle}</a>
					</li>
				))}
			</ul>
		</div>
	);
}
