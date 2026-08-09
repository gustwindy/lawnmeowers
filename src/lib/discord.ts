import type { useLanyard } from "use-lanyard";

import { DISCORD_FONTS } from "@/constants/discord";

export type DisplayNameStyles = Record<string, unknown> | null | undefined;

type Presence = NonNullable<ReturnType<typeof useLanyard>>;
export type Activity = Presence["activities"][number];

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

export function displayNameStyle(
	styles: DisplayNameStyles,
): React.CSSProperties {
	const fontId = styles?.font_id as number | undefined;
	if (!fontId) return {};

	const font = DISCORD_FONTS[fontId];
	if (!font) return {};

	return { fontFamily: `'${font}', sans-serif` };
}
