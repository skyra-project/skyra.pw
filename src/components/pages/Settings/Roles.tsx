import { PUBLIC_ROLES, REMOVE_INITIAL, ROLES } from '@config/SettingsDataEntries';
import { Roles, SettingsPageProps } from '@config/types/GuildSettings';
import PageHeader from '@layout/Settings/PageHeader';
import Section from '@layout/Settings/Section';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import SimpleGrid from '@mui/SimpleGrid';
import SelectBoolean from '@selects/SelectBoolean';
import SelectRole from '@selects/SelectRole';
import SelectRoles from '@selects/SelectRoles';
import React, { FC, memo } from 'react';
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

const Roles: FC<SettingsPageProps> = props => {
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

export default memo(Roles);
