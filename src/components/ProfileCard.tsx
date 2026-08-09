"use client";
import Image from "next/image";

import { usePresence } from "@/hooks/usePresence";
import type { Profile } from "@/types/profile";

export default function ProfileCard({
	profile,
	expand,
}: {
	profile: Profile;
	expand: boolean;
}) {
	const iconSize = expand ? 256 : 128;
	const presence = usePresence(profile.discordId);
	const activity =
		presence?.activities.find((a) => a.type === 0) ??
		presence?.activities.find((a) => a.type === 2) ??
		presence?.activities.find((a) => a.type !== 4);

	const online = presence?.discord_status !== "offline";
	//const displayStatus = activity ? activity.name : (online ? "Online" : "Offline") // ill be honest this is a little bit gay

	return (
		<div
			className={`${expand ? "cursor" : "cursor-pointer hover:scale-105 transition-transform duration-200"} min-w-max min-h-max inline-flex m-2 flex-col items-center justify-center p-6 border-ctp-surface0 border rounded-3xl bg-ctp-base`}
		>
			<div
				className={`${expand ? "items-start gap-1" : "items-center gap-5"} flex`}
			>
				<span className="relative">
					<Image
						src={`/avatars/${profile.username}.png`}
						alt={profile.displayName}
						width={iconSize}
						height={iconSize}
						priority
						className="flex-1 rounded-2xl border border-ctp-surface1"
					/>

					<span
						title={online ? "Online" : "Offline"}
						className={`${online ? "bg-ctp-green" : "bg-ctp-overlay1"} ${expand ? "size-12 border-8" : "size-8 border-6"} absolute -bottom-2 -right-2 rounded-full border-ctp-base block`}
					/>
				</span>

				<div className={`${expand ? "text-2xl ml-5" : ""} flex flex-col pr-5`}>
					<p className="opacity-50" title={profile.roles.join(", ")}>
						{expand ? profile.roles.join(", ") : profile.roles[0]}
						<span className="text-xs opacity-75 ml-1">
							{expand || profile.roles.length <= 1
								? ""
								: `+${profile.roles.length - 1}`}
						</span>
					</p>
					<h2
						className={`${expand ? `text-6xl` : "text-4xl"} text-ctp-mauve-50`}
					>
						{profile.displayName}
					</h2>
					<p className="opacity-75">@{profile.username}</p>
					<p className={expand ? "italic opacity-50 text-base" : "hidden"}>
						"{profile.bio}"
					</p>
				</div>
			</div>
			<span className="bg-ctp-surface1 w-9/10 m-3 h-px" />
			<p className={expand ? "hidden" : "italic opacity-75"}>"{profile.bio}"</p>

			<ul className={expand ? "flex-col flex w-full" : ""}>
				{profile.socials.map((social) => (
					<li
						key={social.platform}
						className={expand ? "block" : "inline-block"}
					>
						<a
							href={social.url}
							className="bg-ctp-surface0 hover:bg-ctp-surface2 transition-background-color duration-100 rounded-full border-ctp-surface2 border m-1 p-1.5 flex gap-2 items-center"
						>
							<Image
								src={`/icons/${social.platform}.png`}
								alt={social.handle}
								width={32}
								height={32}
								title={`${social.handle} on ${social.platform}`}
							/>
							<span className={expand ? "" : "hidden"}>
								{`@${social.handle} on ${social.platform.slice(0, 1).toUpperCase() + social.platform.slice(1).toLowerCase()}`}
							</span>
						</a>
					</li>
				))}
			</ul>
		</div>
	);
}
