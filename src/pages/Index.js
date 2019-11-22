import React, { useGlobal } from 'reactn';
import styled from 'styled-components';
import { Grid, Card, CardHeader, Container, Box, Typography, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import GuildIcon from 'components/GuildIcon';
import { navigate } from 'meta/util';
import theme from 'meta/theme';
import GeneralPage from 'components/GeneralPage';
import { guildAddURL } from 'meta/constants';

import ModerationImage from 'assets/images/features/moderation.png';
import WeebImage from 'assets/images/features/weeb.png';
import FunImage from 'assets/images/features/fun.png';
import ToolsImage from 'assets/images/features/tools.png';

const useStyles = makeStyles(theme => ({
	guildCardContainer: {
		flex: '1 1 0%',
		minWidth: 250,
		maxWidth: 250,
		[theme.breakpoints.down('xs')]: {
			width: '100%',
			maxWidth: 'none'
		},
		transition: 'width 0.2s ease-in-out'
	},
	guildCard: {
		background: theme.palette.secondary.main,
		'&:hover': {
			cursor: 'pointer'
		}
	}
}));

const SectionContainer = styled(Box)`
	background: ${props => (!props.secondary ? theme.palette.primary.main : theme.palette.secondary.main)};
	width: 100%;
	display: flex;
	justify-content: space-around;
	align-items: center;
	align-content: center;
	height: auto;

	flex-direction: ${props => (!props.secondary ? 'row-reverse' : 'row')};
	flex-wrap: wrap;

	.MuiDivider-root {
		margin: 10px 0px;
	}

	.text {
		display: flex;
		flex-direction: column;
		width: 47%;

		${theme.breakpoints.down('xs')} {
			width: 100%;
		}
	}

	img {
		${theme.breakpoints.down('xs')} {
			margin-top: 20px;
		}
	}
`;

const Section = ({ name, image, index }) => (
	<SectionContainer secondary={index % 2 === 0} p={5}>
		<div className="text">
			<Typography variant="h3" component="h1">
				{name}
			</Typography>
			<Divider />
			<Typography>
				Vangelis prime number Jean-François Champollion billions upon billions cosmic ocean Apollonius of Perga. Shores of the
				cosmic ocean inconspicuous motes of rock and gas laws of physics globular star cluster invent the universe corpus callosum?
				Shores of the cosmic ocean vastness is bearable only through love take root and flourish a still more glorious dawn awaits
				take root and flourish vanquish the impossible.
			</Typography>
		</div>
		<img alt="" loading="lazy" src={image} width="400" />
	</SectionContainer>
);

const HomePage = () => {
	const [global] = useGlobal();
	const classes = useStyles();
	const { authenticated, user } = global;
	return (
		<GeneralPage>
			{authenticated && (
				<Box p={2} my={2}>
					<Container>
						<Grid container direction="row" justify="center" alignItems="center" spacing={4} className={classes.guildsList}>
							{(user.guilds || [])
								.filter(guild => guild.userCanManage)
								.sort((a, b) => !!b.channels - !!a.channels)
								.map(guild => (
									<Grid item className={classes.guildCardContainer} key={guild.id}>
										<Card
											elevation={2}
											onClick={navigate(!!guild.channels ? `/guilds/${guild.id}` : guildAddURL(guild.id))}
											className={classes.guildCard}
										>
											<CardHeader
												subheader={!guild.channels && 'Not in server'}
												avatar={<GuildIcon guild={guild} />}
												title={guild.name}
											/>
										</Card>
									</Grid>
								))}
						</Grid>
					</Container>
				</Box>
			)}

			{[
				{ name: 'Moderation', image: ModerationImage },
				{ name: 'Fun', image: FunImage },
				{ name: 'Tools', image: ToolsImage },
				{ name: 'Weeb', image: WeebImage }
			].map(({ name, image }, index) => (
				<Section index={index} name={name} image={image} key={name} />
			))}
		</GeneralPage>
	);
};

export default HomePage;
