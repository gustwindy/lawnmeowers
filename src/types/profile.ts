export type Social = {
	platform: string;
	handle: string;
	url?: string;
};

type Music = {
	title?: string;
	artist?: string;
};

export type Profile = {
	username: string;
	displayName: string;
	bio: string;
	role: string;
	discordId?: string;
	showPresence: boolean;
	socials: Social[];
	music?: Music;
};
