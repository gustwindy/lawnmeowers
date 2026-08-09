import Image from "next/image";

import type { Profile } from "@/types/profile";

export default function ProfileCard({
	profile,
	expand,
}: {
	profile: Profile;
	expand: boolean;
}) {
	const iconSize = expand ? 256 : 128;

	return (
		<div className="min-w-max min-h-max inline-flex m-2 flex-col items-center justify-center p-6 border-ctp-surface0 border rounded-3xl bg-ctp-base">
			<div className="flex gap-5 items-center">
				<Image
					src={`/avatars/${profile.username}.jpg`}
					alt={profile.displayName}
					width={iconSize}
					height={iconSize}
					priority
					className="flex-1 rounded-2xl border border-ctp-surface1"
				/>
				<div
					className={(expand ? "text-2xl ml-5" : "") + " flex flex-col pr-5"}
				>
					<p className="opacity-50" title={profile.roles.join(", ")}>
						{expand ? profile.roles.join(", ") : profile.roles[0]}
						<span className="text-xs opacity-75 ml-1">
							{expand ? "" : `+${profile.roles.length - 1}`}
						</span>
					</p>
					<h2
						className={
							(expand ? "text-6xl" : "text-4xl") + " text-ctp-mauve-50"
						}
					>
						{profile.displayName}
					</h2>
					<p className="opacity-75">@{profile.username}</p>
				</div>
			</div>
			<span className="bg-ctp-surface1 w-9/10 m-3 h-px" />
			<p className="italic opacity-75">"{profile.bio}"</p>

			<ul className={expand ? "flex-col flex w-full" : ""}>
				{profile.socials.map((social) => (
					<li
						key={social.platform}
						className={expand ? "block" : "inline-block"}
					>
						<a
							href={social.url}
							className="bg-ctp-surface0 rounded-full border-ctp-surface2 border m-1 p-1.5 flex gap-2 items-center"
						>
							<Image
								src={`/icons/${social.platform}.png`}
								alt={social.handle}
								width={32}
								height={32}
								title={`${social.handle} on ${social.platform}`}
							/>
							<span className={expand ? "" : "hidden"}>
								{"@" +
									social.handle +
									" on " +
									social.platform.slice(0, 1).toUpperCase() +
									social.platform.slice(1).toLowerCase()}
							</span>
						</a>
					</li>
				))}
			</ul>
		</div>
	);
}
