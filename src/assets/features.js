import ModerationImage from 'assets/images/features/moderation.png';
import WeebImage from 'assets/images/features/weeb.png';
import FunImage from 'assets/images/features/fun.png';
import ToolsImage from 'assets/images/features/tools.png';
import PokemonImage from 'assets/images/features/pokemon.png';

export default [
	{
		name: 'Moderation',
		image: {
			src: ModerationImage,
			width: 400,
			height: 229
		},
		text: [
			'Skyra offers all the standard moderation commands you expect, like banning, muting, kicking, softbanning and more.',
			'However she includes a wide range of unique features such as logging images and reactions, and a very advanced filter.',
			'For a full list of moderation commands, visit the commands page.'
		].join(' ')
	},
	{
		name: 'Fun',
		image: { src: FunImage, width: 400, height: 174 },
		text: [
			'Skyra can brighten up your server with many commands aimed at just adding fun, social interaction to your server',
			'She can find a random blurb of text using markov, roll a magic eightball, generate memes and much much more!'
		].join(' ')
	},
	{
		name: 'Tools',
		image: { src: ToolsImage, width: 400, height: 392 },
		text: [
			'Skyra will add a powerful toolset at your fingertips.',
			'From searching YouTube or Wikipedia to looking up games on IGDB or the Nintendo eShop or movies on TheMovieDatabase.',
			"She can also create polls, quote messages, get full size versions of users' avatars and many more tools alike!"
		].join(' ')
	},
	{
		name: 'Pokémon',
		image: { src: PokemonImage, width: 400, height: 364 },
		text: [
			'Skyra has a rich dataset of Pokémon data.',
			'Query for data on any Pokémon, get details on items, moves and abilities,',
			'Find how types matchup or learn whether a Pokémon learns a move or not.'
		].join(' ')
	},
	{
		name: 'Weeb',
		image: { src: WeebImage, width: 400, height: 326 },
		text: [
			'This is for you people of the modern age who love anime. Skyra has many anime related commands.',
			"You can make Skyra slap that annoying guy that likes Ram instead of Rem or get the cutest anime cats that you just can't wait to cuddle to death.",
			"If you're just looking for your next watch or read then Skyra has got you covered by offering you to look up anime and manga on kitsu.io."
		].join(' ')
	}
];
