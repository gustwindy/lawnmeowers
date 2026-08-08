import { redirect } from "next/navigation";

const DISCORD_URL = "https://discord.gg/ErYKYhkcW3";

export default function DiscordRedirect() {
	redirect(DISCORD_URL);
}
