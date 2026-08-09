import { useLanyard } from "use-lanyard";

import type { Profile } from "@/types/profile";

export function usePresence(discordId: Profile["discordId"]) {
	return useLanyard(discordId ?? "0", {
		api: {
			hostname: "lanyard.nyarw.moe",
			secure: true,
		},
	});
}
