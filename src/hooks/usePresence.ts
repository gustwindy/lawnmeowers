import { useLanyard } from "use-lanyard";

import type { Profile } from "@/types/profile";

type Presence = NonNullable<ReturnType<typeof usePresence>>;
export type Activity = Presence["activities"][number];

export function usePresence(discordId: Profile["discordId"]) {
	return useLanyard(discordId ?? "0", {
		api: {
			hostname: "lanyard.nyarw.moe",
			secure: true,
		},
	});
}

export function getActivityImageUrl(activity: Activity) {
	const image = activity.assets?.large_image;

	if (!image) return null;

	if (image.startsWith("spotify:")) {
		return `https://i.scdn.co/image/${image.slice(8)}`;
	}

	if (image.startsWith("mp:external/")) {
		return `https://media.discordapp.net/${image.slice(3)}`;
	}

	return `https://cdn.discordapp.com/app-assets/${activity.application_id}/${image}.png`;
}
