/**
 * Retrieves an acronym for a guild name based on Discord datamining
 * @see https://github.com/discordjs/discord.js/pull/4104
 * @param name The guild name to retrieve the acronym for
 */
export default function getAcronym(name: string) {
	return name
		.replace(/'s /g, ' ')
		.replace(/\w+/g, (e) => e[0])
		.replace(/\s/g, '');
}
