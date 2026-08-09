"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

import { usePresence } from "@/hooks/usePresence";
import {
	type DisplayNameStyles,
	displayNameStyle,
	getActivityImageUrl,
} from "@/lib/discord";
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

	const nameStyle = displayNameStyle(
		(presence?.discord_user as Record<string, unknown> | undefined)
			?.display_name_styles as DisplayNameStyles,
	);

	const [extension, setExtension] = useState("png");

	const avatar = presence?.discord_user?.avatar
		? `https://cdn.discordapp.com/avatars/${profile.discordId}/${presence.discord_user.avatar}.png`
		: null;

	const avatarSrc =
		extension === "png"
			? `/avatars/${profile.username}.png`
			: extension === "jpg"
				? `/avatars/${profile.username}.jpg`
				: (avatar ?? `/avatars/${profile.username}.png`);

	const activity =
		presence?.activities.find((a) => a.type === 0) ??
		presence?.activities.find((a) => a.type === 2) ??
		presence?.activities.find((a) => a.type !== 4);

	const [now, setNow] = useState(Date.now());

	useEffect(() => {
		if (!activity?.timestamps?.start) return;

		const interval = setInterval(() => setNow(Date.now()), 1000);
		return () => clearInterval(interval);
	}, [activity?.timestamps?.start]);

	const status: Record<string, { color: string; label: string }> = {
		online: { color: "bg-ctp-green", label: "Online" },
		idle: { color: "bg-ctp-yellow", label: "Idle" },
		dnd: { color: "bg-ctp-red", label: "Do Not Disturb" },
		offline: { color: "bg-ctp-surface1", label: "Offline" },
	};

	const currentStatus =
		status[presence?.discord_status ?? "offline"] ?? status.offline;

	const activityImageUrl = activity ? getActivityImageUrl(activity) : null;

	const activityHeader = (() => {
		if (!activity) return "";
		switch (activity.type) {
			case 2:
				return "Listening to";
			case 3:
				return "Watching";
			case 5:
				return "Competing in";
			default:
				return;
		}
	})();

	const activityTimestamp = (() => {
		if (!activity?.timestamps) return undefined;

		const { start, end } = activity.timestamps;

		const formatTime = (ms: number) => {
			const totalSec = Math.floor(ms / 1000);
			const h = Math.floor(totalSec / 3600);
			const m = Math.floor((totalSec % 3600) / 60);
			const s = String(totalSec % 60).padStart(2, "0");

			if (h > 0) {
				const padM = String(m).padStart(2, "0");
				return `${h}:${padM}:${s}`;
			}

			return `${m}:${s}`;
		};

		// listening or watching
		if (start && end) {
			const currentMs = Math.max(0, Math.min(now - start, end - start));
			const totalMs = end - start;
			return `${formatTime(currentMs)} / ${formatTime(totalMs)}`;
		}

		// activities with elapsed time
		if (start) {
			const elapsedMs = Math.max(0, now - start);
			return `${formatTime(elapsedMs)}`;
		}

		return undefined;
	})();

	return (
		<div
			className={`${
				expand
					? "w-full max-w-3xl cursor items-start"
					: "min-w-max cursor-pointer hover:scale-105 transition-transform duration-200"
			} min-h-max inline-flex m-2 flex-col items-center justify-center p-6 border-ctp-surface0 border rounded-3xl bg-ctp-base`}
		>
			<div
				className={`${expand ? "items-start w-full" : "items-center"} gap-5 flex relative`}
			>
				<span className="relative">
					<Image
						src={avatarSrc}
						alt={profile.displayName}
						width={iconSize}
						height={iconSize}
						priority
						onError={() =>
							setExtension(extension === "png" ? "jpg" : "discord")
						}
						className="flex-1 rounded-2xl border border-ctp-surface1"
					/>

					{/*{presence?.discord_user.avatar_decoration_data?.asset && (
						<Image
							src={`https://cdn.discordapp.com/avatar-decoration-presets/${presence.discord_user.avatar_decoration_data.asset}.png`}
							alt=""
							width={iconSize}
							height={iconSize}
							className="pointer-events-none absolute inset-0 z-10"
						/>
					)}*/}

					<span
						title={currentStatus.label}
						className={`${currentStatus.color} ${expand ? "size-12 border-8" : "size-8 border-6"} absolute -bottom-2 -right-2 rounded-full border-ctp-base block`}
					/>
				</span>

				<div
					className={expand ? "flex flex-col flex-1 self-stretch" : "contents"}
				>
					<div className={expand ? "flex flex-col" : "flex flex-col pr-5"}>
						{!expand && (
							<p className="opacity-50" title={profile.roles.join(", ")}>
								{profile.roles[0]}
								<span className="text-xs opacity-75 ml-1">
									{profile.roles.length <= 1
										? ""
										: `+${profile.roles.length - 1}`}
								</span>
							</p>
						)}
						<h2
							className={`${expand ? `text-6xl` : "text-4xl"} text-ctp-mauve-50`}
							style={nameStyle}
						>
							{profile.displayName}
						</h2>
						<p className="opacity-75">@{profile.username}</p>
						<p className={expand ? "italic opacity-50 text-base" : "hidden"}>
							"{profile.bio}"
						</p>
					</div>

					{expand && activity && activityImageUrl && (
						<div className="flex mt-auto bg-ctp-surface0 p-2 gap-2 rounded-2xl">
							<div className="relative aspect-square self-stretch shrink-0 min-w-16">
								<Image
									src={activityImageUrl}
									alt={activity.name}
									fill
									sizes="256px"
									className="rounded-xl object-cover"
									priority
								/>
							</div>
							<div>
								<p className="text-xl text-ctp-mauve">
									{activityHeader ? `${activityHeader} ` : ""}
									{activity.name}
								</p>
								{activity.details && <p>{activity.details}</p>}
								<p>{activity.state}</p>
								{activityTimestamp !== undefined && <p>{activityTimestamp}</p>}
							</div>
						</div>
					)}
				</div>

				{expand && (
					<p className="absolute top-0 right-0 opacity-50 text-right">
						{profile.roles.join(", ")}
					</p>
				)}
			</div>

			<span className="bg-ctp-surface1 w-[95%] m-4 h-px self-center" />
			<p className={expand ? "hidden" : "italic opacity-75"}>"{profile.bio}"</p>

			<ul className={expand ? "flex-col flex w-full" : ""}>
				{profile.socials.map((social) => (
					<li
						key={social.platform}
						className={expand ? "block" : "inline-block"}
					>
						<a
							href={social.url}
							target="_blank"
							className="bg-ctp-surface0 hover:bg-ctp-surface2 transition-background-color duration-100 hover:scale-y-104 hover:scale-x-102 rounded-full border-ctp-surface2 border m-1 p-1.5 flex gap-2 items-center"
						>
							<Image
								src={`/icons/${social.platform}.png`}
								alt={social.handle}
								width={32}
								height={32}
								title={`${social.handle} on ${social.platform}`}
								priority
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
