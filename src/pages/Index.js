import { Box, Container, Divider, Hidden, Typography } from '@material-ui/core';
import features from 'assets/features';
import GeneralPage from 'components/GeneralPage';
import GuildCard from 'components/GuildCard';
import React, { useGlobal } from 'reactn';
import scss from 'stylesheets/modules/HomePage.module.scss';

const Section = ({ name, image, text }) => (
	<Box p={5} className={scss.box}>
		<div className={scss.text}>
			<Typography variant="h3" component="h1">
				{name}
			</Typography>
			<Divider classes={{ root: scss.divider }} />
			<Typography>{text}</Typography>
		</div>
		<Hidden smDown>
			<img alt={name} src={image.src} width={image.width} height={image.height} className={scss.previewImage} loading="lazy" />
		</Hidden>
	</Box>
);

const HomePage = () => {
	const [authenticated] = useGlobal('authenticated');
	const [user] = useGlobal('user');
	return (
		<GeneralPage>
			{authenticated && (
				<Container>
					<Box display="flex" flexWrap="wrap" flexDirection="row" justifyContent="center" alignItems="center">
						{(user.guilds || [])
							.filter(guild => guild.manageable)
							.sort((a, b) => b.skyraIsIn - a.skyraIsIn || a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }))
							.map(guild => (
								<GuildCard guild={guild} key={guild.id} />
							))}
					</Box>
				</Container>
			)}

			{features.map(({ name, image, text }) => (
				<Section name={name} image={image} text={text} key={name} />
			))}
		</GeneralPage>
	);
};

export default HomePage;
