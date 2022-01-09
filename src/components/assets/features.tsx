import { Paper } from '@material-ui/core';
import Link from '@routing/Link';
import {
	DiscordActionRow,
	DiscordAttachments,
	DiscordButton,
	DiscordEmbed,
	DiscordEmbedDescription,
	DiscordEmbedField,
	DiscordEmbedFields,
	DiscordEmbedFooter,
	DiscordMention,
	DiscordMessage,
	DiscordMessages
} from '@skyra/discord-components-react';
import React from 'react';
import { Twemoji } from 'react-emoji-render';

const heavyRightPointingArrow = '\u276F';

export default [
	{
		name: 'Moderation',
		text: [
			'Skyra offers all the standard moderation commands you expect, like banning, muting, kicking, softbanning and more.',
			'However, she also includes a wide range of unique features such as logging images and reactions, and a very advanced filter.',
			'For a full list of moderation commands, visit the commands page.'
		].join(' '),
		previewContent: (
			<Paper elevation={8}>
				<DiscordMessages>
					<DiscordMessage profile="favna">
						Skyra, mute <DiscordMention>Kyra</DiscordMention> 10m Spamming.
					</DiscordMessage>
					<DiscordMessage profile="skyra">
						<DiscordEmbed slot="embeds" color="#FFD54F" authorImage="/avatars/favna.gif" authorName="Favna#0001">
							<DiscordEmbedDescription slot="description">
								<strong>{heavyRightPointingArrow} Type</strong>: Temporary Mute
								<br />
								<strong>{heavyRightPointingArrow} User</strong>: Kyra#0001 (242043489611808769)
								<br />
								<strong>{heavyRightPointingArrow} Reason</strong>: Spamming.
								<br />
								<strong>{heavyRightPointingArrow} Expires In</strong>: 10 minutes
							</DiscordEmbedDescription>
							<DiscordEmbedFooter slot="footer" footerImage="/avatars/skyra.png" timestamp={new Date()}>
								Case 11
							</DiscordEmbedFooter>
						</DiscordEmbed>
					</DiscordMessage>
				</DiscordMessages>
			</Paper>
		)
	},
	{
		name: 'Fun',
		text: [
			'Skyra can brighten up your server with many commands for adding fun and social interaction to your server.',
			'She can create a random blurb of text using markov, roll a magic eightball, generate memes, and much much more!'
		].join(' '),
		previewContent: (
			<Paper elevation={8}>
				<DiscordMessages>
					<DiscordMessage profile="kyra">Skyra, markov</DiscordMessage>
					<DiscordMessage profile="skyra">
						<DiscordEmbed slot="embeds" color="#FF9D01">
							<DiscordEmbedDescription slot="description">
								Big mama is beyond Merlin's powers I'm basing this though i like it, and calls <code>renderToString()</code> and throw
								if I'd add test to them are down to go that can be <i>reviewed</i> by myself and its loaded from google them the
								client due to send the avatar in actually did automod stuff need to the dice! You rolled the id wdym
							</DiscordEmbedDescription>
						</DiscordEmbed>
					</DiscordMessage>
				</DiscordMessages>
			</Paper>
		)
	},
	{
		name: 'Tools',
		text: [
			'Skyra gives you many useful tools at your fingertips.',
			'From searching YouTube or Wikipedia, to looking up games on IGDB or the Nintendo eShop, or even movies on TheMovieDatabase.',
			"She can also create polls, quote messages, get full size versions of users' avatars, and more!"
		].join(' '),
		previewContent: (
			<Paper elevation={8}>
				<DiscordMessages>
					<DiscordMessage profile="kyra">Skyra, youtube Big Buck Bunny</DiscordMessage>
					<DiscordMessage profile="skyra">
						<DiscordEmbed
							slot="embeds"
							color="#FF0000"
							provider="YouTube"
							authorName="Blender"
							authorUrl="https://www.youtube.com/user/BlenderFoundation"
							url="https://youtu.be/aqz-KE-bpKQ"
							video="https://download.blender.org/peach/bigbuckbunny_movies/big_buck_bunny_1080p_stereo.ogg"
							embedTitle="Big Buck Bunny 60fps 4K - Official Blender Foundation Short Film"
							image="https://cdn.skyra.pw/dashboard/bigbuckbunny.jpg"
						></DiscordEmbed>
						<DiscordAttachments slot="components">
							<DiscordActionRow>
								<DiscordButton type="primary" emoji="/twemojis/fast_reverse.svg" emojiName="⏪" />
								<DiscordButton type="primary" emoji="/twemojis/left_arrow.svg" emojiName="◀️" />
								<DiscordButton type="primary" emoji="/twemojis/right_arrow.svg" emojiName="▶️" />
								<DiscordButton type="primary" emoji="/twemojis/fast_forward.svg" emojiName="⏩" />
								<DiscordButton type="destructive" emoji="/twemojis/stop_button.svg" emojiName="⏹" />
							</DiscordActionRow>
						</DiscordAttachments>
					</DiscordMessage>
				</DiscordMessages>
			</Paper>
		)
	},
	{
		name: 'Pokémon',
		text: [
			'Skyra has a rich dataset of Pokémon data.',
			'You can query for data on any Pokémon, get details on items, moves and abilities.',
			'You can find how types match up or learn whether a Pokémon can learn a certain move.',
			'Data is (nearly) always up-to-date by using the amazing GraphQL Pokémon API!'
		].join(' '),
		previewContent: (
			<Paper elevation={8}>
				<DiscordMessages>
					<DiscordMessage profile="favna">Skyra, pokedex Dragonite</DiscordMessage>
					<DiscordMessage profile="skyra">
						<DiscordEmbed
							slot="embeds"
							color="#A3501A"
							authorImage="https://cdn.skyra.pw/img/pokemon/dex.png"
							authorName="#149 - Dragonite"
							thumbnail="https://play.pokemonshowdown.com/sprites/ani/dragonite.gif"
						>
							<DiscordEmbedFields slot="fields">
								<DiscordEmbedField fieldTitle="Type(s)" inline inlineIndex={1}>
									Dragon, Flying
								</DiscordEmbedField>
								<DiscordEmbedField fieldTitle="Abilities" inline inlineIndex={2}>
									Inner Focus, <i>Multiscale</i>
								</DiscordEmbedField>
								<DiscordEmbedField fieldTitle="Gender Ratio" inline inlineIndex={3}>
									<Twemoji text="50% ♂️ | 50% ♀️" />
								</DiscordEmbedField>
								<DiscordEmbedField fieldTitle="Evolutionary line">
									<code>Dratini</code> → <code>Dragonair</code> (30) → <strong>Dragonite (55)</strong>
								</DiscordEmbedField>
								<DiscordEmbedField fieldTitle="Base Stats">
									HP: <strong>91</strong>, ATK: <strong>134</strong>, DEF: <strong>95</strong>, SPA: <strong>100</strong>, SPD:{' '}
									<strong>100</strong>, SPE: <strong>80</strong> (<i>BST</i>: <strong>600</strong>)
								</DiscordEmbedField>
								<DiscordEmbedField fieldTitle="External resources">
									<Link
										TextTypographyProps={{
											style: {
												fontFamily: 'Whitney',
												lineHeight: 1.25
											}
										}}
										href="https://bulbapedia.bulbagarden.net/wiki/dragonite_%28Pokemon%29"
										text="Bulbapedia"
									/>{' '}
									|{' '}
									<Link
										TextTypographyProps={{
											style: {
												fontFamily: 'Whitney',
												lineHeight: 1.25
											}
										}}
										href="https://www.serebii.net/pokedex-swsh/dragonite"
										text="Serebii"
									/>{' '}
									|{' '}
									<Link
										TextTypographyProps={{
											style: {
												fontFamily: 'Whitney',
												lineHeight: 1.25
											}
										}}
										href="https://www.smogon.com/dex/ss/pokemon/dragonite"
										text="Smogon"
									/>
								</DiscordEmbedField>
							</DiscordEmbedFields>
							<DiscordEmbedFooter slot="footer">1/3</DiscordEmbedFooter>
						</DiscordEmbed>
						<DiscordAttachments slot="components">
							<DiscordActionRow>
								<DiscordButton type="primary" emoji="/twemojis/fast_reverse.svg" emojiName="⏪" />
								<DiscordButton type="primary" emoji="/twemojis/left_arrow.svg" emojiName="◀️" />
								<DiscordButton type="primary" emoji="/twemojis/right_arrow.svg" emojiName="▶️" />
								<DiscordButton type="primary" emoji="/twemojis/fast_forward.svg" emojiName="⏩" />
								<DiscordButton type="destructive" emoji="/twemojis/stop_button.svg" emojiName="⏹" />
							</DiscordActionRow>
						</DiscordAttachments>
					</DiscordMessage>
				</DiscordMessages>
			</Paper>
		)
	},
	{
		name: 'Anime',
		text: [
			'Skyra has many anime related commands.',
			"You can make Skyra slap that annoying guy that likes Ram instead of Rem, or see the cutest anime cats that you just can't wait to cuddle to death.",
			"If you're just looking for your next watch or read, then Skyra has you covered by letting you look up anime and manga on anilist.co and kitsu.io."
		].join(' '),
		previewContent: (
			<Paper elevation={8}>
				<DiscordMessages>
					<DiscordMessage profile="favna">Skyra, anime Pokemon</DiscordMessage>
					<DiscordMessage profile="skyra">
						<DiscordEmbed
							slot="embeds"
							color="#80C33E"
							embedTitle="Pokémon"
							url="https://anilist.co/anime/527"
							image="https://img.anili.st/media/527"
						>
							<DiscordEmbedDescription slot="description">
								<strong>Romanized name:</strong> Pocket Monsters
								<br />
								<strong>English name:</strong> Pokémon
								<br />
								<strong>Native name:</strong> ポケットモンスター
								<br />
								<strong>Country of origin:</strong> JP
								<br />
								<strong>Amount of episodes:</strong> 276
								<br />
								<strong>Episode length:</strong> 24 minutes
								<br />
								<strong>Includes adult content:</strong> No
								<br />
								<strong>External links:</strong> <a href="https://www.netflix.com/title/70297439">Netflix</a> and{' '}
								<a href="https://watch.pokemon.com/en-us/season.html?id=pokemon-indigo-league-vol-1">Official Site</a>
								<br />
								<br />A young boy named Satoshi embarks on a journey to become a "Pokémon Master" with his first Pokémon, Pikachu.
								Joining him on his travels are Takeshi, a girl-obsessed Rock Pokemon Trainer, and Kasumi, a tomboyish Water Pokémon
								Trainer who may have a crush on him. Satoshi and Co. end up traveling through various regions, including Kanto, the
								Orange Islands, and Johto, and then enter the Pokémon League competitions there. Along the way, they run into many
								confrontations with Musashi, Kojirou,...
							</DiscordEmbedDescription>
							<DiscordEmbedFooter slot="footer">1/10</DiscordEmbedFooter>
						</DiscordEmbed>
						<DiscordAttachments slot="components">
							<DiscordActionRow>
								<DiscordButton type="primary" emoji="/twemojis/fast_reverse.svg" emojiName="⏪" />
								<DiscordButton type="primary" emoji="/twemojis/left_arrow.svg" emojiName="◀️" />
								<DiscordButton type="primary" emoji="/twemojis/right_arrow.svg" emojiName="▶️" />
								<DiscordButton type="primary" emoji="/twemojis/fast_forward.svg" emojiName="⏩" />
								<DiscordButton type="destructive" emoji="/twemojis/stop_button.svg" emojiName="⏹" />
							</DiscordActionRow>
						</DiscordAttachments>
					</DiscordMessage>
				</DiscordMessages>
			</Paper>
		)
	}
];
