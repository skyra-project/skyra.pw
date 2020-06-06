import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import PageHeader from 'components/PageHeader';
import Section from 'components/Section';
import SelectBoolean from 'components/Select/SelectBoolean';
import SelectRole from 'components/Select/SelectRole';
import SelectRoles from 'components/Select/SelectRoles';
import SimpleGrid from 'components/SimpleGrid';
import { Roles, SettingsPageProps } from 'lib/types/GuildSettings';
import React, { PropsWithChildren } from 'react';
import { PickByValue } from 'utility-types';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		button: {
			[theme.breakpoints.only('md')]: {
				minHeight: 60
			}
		},
		buttonText: {
			display: 'block',
			textAlign: 'left'
		},
		divider: {
			backgroundColor: theme.palette.secondary.light,
			marginBottom: theme.spacing(3),
			paddingBottom: theme.spacing(0.25)
		}
	})
);

export default (props: PropsWithChildren<SettingsPageProps>) => {
	const classes = useStyles();
	const theme = useTheme();
	const isOnMobile = useMediaQuery(theme.breakpoints.down('sm'));

	return (
		<>
			<PageHeader
				title="Roles"
				subtitle={
					<>
						Here you can configure special roles known to Skyra for your server.
						{isOnMobile ? ' Long press' : ' Hover over'} a button to get more informatation about that particular role
					</>
				}
			/>

			<Section title="Toggles">
				<SelectBoolean
					title={REMOVE_INITIAL.name}
					description={REMOVE_INITIAL.tooltip}
					currentValue={props.guildSettings.roles.removeInitial}
					onChange={event =>
						props.patchGuildData({
							roles: {
								removeInitial: event.target.checked
							}
						})
					}
				/>
			</Section>

			<Section title="Configurable Roles">
				<SimpleGrid
					direction="row"
					justify="flex-start"
					gridItemProps={{
						xs: 12,
						sm: 12,
						md: 4,
						lg: 4,
						xl: 4
					}}
				>
					{ROLES.map(({ name, tooltip, key: settingsProp }, index) => (
						<SelectRole
							key={index}
							label={name}
							// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
							value={props.guildSettings.roles[settingsProp] as keyof PickByValue<Roles, string>}
							onChange={r =>
								props.patchGuildData({
									roles: {
										[settingsProp]: r
									}
								})
							}
							guild={props.guildData}
							tooltipTitle={tooltip}
							filterEveryone
							buttonProps={{
								fullWidth: true,
								classes: {
									root: classes.button,
									label: classes.buttonText
								}
							}}
						/>
					))}
					<SelectRoles
						filterEveryone
						key={ROLES.length + 1}
						tooltipTitle={PUBLIC_ROLES.tooltip}
						value={props.guildSettings.roles.public}
						onChange={r =>
							props.patchGuildData({
								roles: {
									public: r
								}
							})
						}
						guild={props.guildData}
						label={PUBLIC_ROLES.name}
						buttonProps={{
							fullWidth: true,
							classes: {
								root: classes.button,
								label: classes.buttonText
							}
						}}
					/>
				</SimpleGrid>
			</Section>
		</>
	);
};

const REMOVE_INITIAL: Role = {
	name: 'Remove Initial',
	tooltip: 'Whether the claim of a public role should remove the initial one too.',
	key: 'removeInitial'
};

const PUBLIC_ROLES: Role = {
	name: 'Public Roles',
	tooltip: 'The public roles, they will be given with no cost to any user using the roles command.',
	key: 'public'
};

const ROLES: Role[] = [
	{
		name: 'Administrator',
		tooltip:
			'The administrator role, their priviledges in Skyra will be upon moderative, covering management. Defaults to anyone with the Manage Server permission.',
		key: 'admin'
	},
	{ name: 'Initial', tooltip: 'The initial role, if configured, I will give it to users as soon as they join.', key: 'initial' },
	{
		name: 'Moderator',
		tooltip: 'The moderator role, their priviledges will cover almost all moderation commands. Defaults to anyone who can ban members.',
		key: 'moderator'
	},
	{
		name: 'Muted',
		tooltip: 'The muted role, if configured, I will give new muted users this role. Otherwise I will prompt you the creation of one.',
		key: 'muted'
	},
	{
		name: 'Member Logs',
		tooltip: 'The channel for member logs, once enabled, I will post all member related events there.',
		key: 'restricted-reaction'
	},
	{
		name: 'Restricted Reaction',
		tooltip: 'The role that is used for the restrictReaction moderation command.',
		key: 'restricted-reaction'
	},
	{
		name: 'Restricted Embed',
		tooltip: 'The role that is used for the restrictEmbed moderation command.',
		key: 'restricted-embed'
	},
	{
		name: 'Restricted Emoji',
		tooltip: 'The role that is used for the restrictEmoji moderation command.',
		key: 'restricted-emoji'
	},
	{
		name: 'Restricted Voice',
		tooltip: 'The role that is used for the restrictVoice moderation command.',
		key: 'restricted-voice'
	},
	{
		name: 'DJ',
		tooltip: "The DJ role for this server. DJs have more advanced control over Skyra's music commands.",
		key: 'dj'
	},
	{
		name: 'Subscriber',
		tooltip:
			'The subscriber role, this role will be mentioned every time you use the announce command. I will always keep it non-mentionable so people do not abuse mentions.',
		key: 'subscriber'
	}
];

interface Role {
	name: string;
	tooltip: string;
	key: keyof PickByValue<Roles, string | string[] | boolean>;
}
