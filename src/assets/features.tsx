import { Box, Paper } from '@material-ui/core';
import {
	DiscordEmbed,
	DiscordEmbedField,
	DiscordEmbedFields,
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
			'However she includes a wide range of unique features such as logging images and reactions, and a very advanced filter.',
			'For a full list of moderation commands, visit the commands page.'
		].join(' '),
		previewContent: (
			<Paper elevation={8}>
				<DiscordMessages>
					<DiscordMessage author="Favna" roleColor="#FF9D01" profile="favna">
						Skyra, mute <DiscordMention>Kyra</DiscordMention> 10m Spamming.
					</DiscordMessage>
					<DiscordMessage author="Skyra" roleColor="#1E88E5" bot verified profile="skyra">
						<DiscordEmbed
							slot="embeds"
							color="#FFD54F"
							authorImage="/avatars/favna.png"
							authorName="Favna#0001"
							footerImage="/avatars/skyra.png"
							timestamp={new Date()}
						>
							<strong>{heavyRightPointingArrow} Type</strong>: Temporary Mute
							<br />
							<strong>{heavyRightPointingArrow} User</strong>: Kyra#0001 (242043489611808769)
							<br />
							<strong>{heavyRightPointingArrow} Reason</strong>: Spamming.
							<br />
							<strong>{heavyRightPointingArrow} Expires In</strong>: 10 minutes
							<Box component="span" slot="footer">
								Case 11
							</Box>
						</DiscordEmbed>
					</DiscordMessage>
				</DiscordMessages>
			</Paper>
		)
	},
	{
		name: 'Fun',
		text: [
			'Skyra can brighten up your server with many commands aimed at just adding fun, social interaction to your server',
			'She can find a random blurb of text using markov, roll a magic eightball, generate memes and much much more!'
		].join(' '),
		previewContent: (
			<Paper elevation={8}>
				<DiscordMessages>
					<DiscordMessage author="Kyra" roleColor="#FF9D01" profile="kyra">
						Skyra, markov
					</DiscordMessage>
					<DiscordMessage author="Skyra" roleColor="#1E88E5" bot verified profile="skyra">
						<DiscordEmbed slot="embeds" color="#FF9D01">
							Big mama is beyond Merlin's powers I'm basing this though i like it, and calls <code>renderToString()</code> and
							throw if I'd add test to them are down to go that can be <i>reviewed</i> by myself and its loaded from google
							them the client due to send the avatar in actually did automod stuff need to the dice! You rolled the id wdym
						</DiscordEmbed>
					</DiscordMessage>
				</DiscordMessages>
			</Paper>
		)
	},
	{
		name: 'Tools',
		text: [
			'Skyra will add a powerful toolset at your fingertips.',
			'From searching YouTube or Wikipedia to looking up games on IGDB or the Nintendo eShop or movies on TheMovieDatabase.',
			"She can also create polls, quote messages, get full size versions of users' avatars and many more tools alike!"
		].join(' '),
		previewContent: (
			<Paper elevation={8}>
				<DiscordMessages>
					<DiscordMessage author="Kyra" roleColor="#FF9D01" profile="kyra">
						Skyra, youtube BeatSaber - Caramelldansen (Speedcake Remix) [FullBodyTracking]
					</DiscordMessage>
					<DiscordMessage author="Skyra" roleColor="#1E88E5" bot verified profile="skyra">
						<DiscordEmbed
							slot="embeds"
							color="#FF0000"
							authorName="omotea"
							authorUrl="https://youtu.be/flAsTHJ6mlU"
							url="https://youtu.be/flAsTHJ6mlU"
							embedTitle="BeatSaber - Caramelldansen (Speedcake Remix) [FullBodyTracking]"
							image="https://i.ytimg.com/vi/flAsTHJ6mlU/hqdefault.jpg"
						></DiscordEmbed>
					</DiscordMessage>
				</DiscordMessages>
			</Paper>
		)
	},
	{
		name: 'Pokémon',
		text: [
			'Skyra has a rich dataset of Pokémon data.',
			'Query for data on any Pokémon, get details on items, moves and abilities,',
			'Find how types matchup or learn whether a Pokémon learns a move or not.',
			'Data is (nearly) always up-to-date by using the amazing GraphQL Pokémon API!'
		].join(' '),
		previewContent: (
			<Paper elevation={8}>
				<DiscordMessages>
					<DiscordMessage author="Favna" roleColor="#FF9D01" profile="favna">
						Skyra, pokedex Dragonite
					</DiscordMessage>
					<DiscordMessage author="Skyra" roleColor="#1E88E5" bot verified profile="skyra">
						<DiscordEmbed
							slot="embeds"
							color="#A3501A"
							authorImage="https://cdn.skyra.pw/img/pokemon/dex.png"
							authorName="#149 - Dragonite"
							thumbnail="https://play.pokemonshowdown.com/sprites/ani/dragonite.gif"
						>
							<DiscordEmbedFields slot="fields">
								<DiscordEmbedField fieldTitle="Type(s)" inline>
									Dragon, Flying
								</DiscordEmbedField>
								<DiscordEmbedField fieldTitle="Abilities" inline>
									Inner Focus, <i>Multiscale</i>
								</DiscordEmbedField>
								<DiscordEmbedField fieldTitle="Gender Ratio" inline>
									<Twemoji text="50% ♂️ | 50% ♀️" />
								</DiscordEmbedField>
								<DiscordEmbedField fieldTitle="Evolutionary line">
									<code>Dratini</code> → <code>Dragonair</code> (30) → <strong>Dragonite (55)</strong>
								</DiscordEmbedField>
								<DiscordEmbedField fieldTitle="Base Stats">
									HP: <strong>91</strong>, ATK: <strong>134</strong>, DEF: <strong>95</strong>, SPA: <strong>100</strong>,
									SPD: <strong>100</strong>, SPE: <strong>80</strong> (<i>BST</i>: <strong>600</strong>)
								</DiscordEmbedField>
								<DiscordEmbedField fieldTitle="External resources">
									<a href="https://bulbapedia.bulbagarden.net/wiki/dragonite_%28Pokemon%29">Bulbapedia</a> |{' '}
									<a href="https://www.serebii.net/pokedex-sm/149.shtml">Serebii</a> |{' '}
									<a href="https://www.smogon.com/dex/sm/pokemon/dragonite">Smogon</a>
								</DiscordEmbedField>
							</DiscordEmbedFields>
							<Box component="span" slot="footer">
								1/3
							</Box>
						</DiscordEmbed>
					</DiscordMessage>
				</DiscordMessages>
			</Paper>
		)
	},
	{
		name: 'Weeb',
		text: [
			'This is for you people of the modern age who love anime. Skyra has many anime related commands.',
			"You can make Skyra slap that annoying guy that likes Ram instead of Rem or get the cutest anime cats that you just can't wait to cuddle to death.",
			"If you're just looking for your next watch or read then Skyra has got you covered by offering you to look up anime and manga on kitsu.io."
		].join(' '),
		previewContent: (
			<Paper elevation={8}>
				<DiscordMessages>
					<DiscordMessage author="Favna" roleColor="#FF9D01" profile="favna">
						Skyra, anime Fate/Zero
					</DiscordMessage>
					<DiscordMessage author="Skyra" roleColor="#1E88E5" bot verified profile="skyra">
						<DiscordEmbed
							slot="embeds"
							color="#80C33E"
							embedTitle="Fate/Zero"
							url="https://kitsu.io/anime/6028"
							thumbnail="https://media.kitsu.io/anime/poster_images/6028/original.jpg?1492613350"
						>
							<DiscordEmbedFields slot="fields">
								<DiscordEmbedField inline fieldTitle="Type">
									<Twemoji text="📺 TV" />
								</DiscordEmbedField>
								<DiscordEmbedField inline fieldTitle="Score">
									82.63%
								</DiscordEmbedField>
								<DiscordEmbedField inline fieldTitle="Episode(s)">
									13
								</DiscordEmbedField>
								<DiscordEmbedField inline fieldTitle="Episode length">
									28 minutes
								</DiscordEmbedField>
								<DiscordEmbedField inline fieldTitle="Age rating">
									R
								</DiscordEmbedField>
								<DiscordEmbedField inline fieldTitle="First air date">
									October 2nd 2011
								</DiscordEmbedField>
								<DiscordEmbedField fieldTitle="Watch it here">
									<strong>
										<a href="https://kitsu.io/anime/6028">Fate/Zero</a>
									</strong>
								</DiscordEmbedField>
							</DiscordEmbedFields>
							<strong>English title:</strong> Fate/Zero
							<br />
							<strong>Japanese title:</strong> フェイト/ゼロ
							<br />
							<strong>Canonical title:</strong> Fate/Zero
							<br />
							With the promise of granting any wish, the omnipotent Holy Grail triggered three wars in the past, each too
							cruel and fierce to leave a victor. In spite of that, the wealthy Einzbern family is confident that the Fourth
							Holy Grail War will be different; namely, with a vessel of the Holy Grail now in their grasp. Solely for this
							reason, the much hated "Magus Killer" Kiritsugu Emiya is hired by the Einzberns, with marriage to their only
							daughter Irisviel as binding contract.
							<Box component="span" slot="footer">
								1/10 - © kitsu.io
							</Box>
						</DiscordEmbed>
					</DiscordMessage>
				</DiscordMessages>
			</Paper>
		)
	}
];
