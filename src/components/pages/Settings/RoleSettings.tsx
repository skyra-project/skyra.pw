import { ConfigurablePublicRoles, ConfigurableRemoveInitialRole, ConfigurableRoles } from '@config/SettingsDataEntries';
import { useGuildDataContext } from '@contexts/Settings/GuildDataContext';
import { useGuildSettingsChangesContext } from '@contexts/Settings/GuildSettingsChangesContext';
import { useGuildSettingsContext } from '@contexts/Settings/GuildSettingsContext';
import PageHeader from '@layout/Settings/PageHeader';
import Section from '@layout/Settings/Section';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import SimpleGrid from '@mui/SimpleGrid';
import SelectBoolean from '@selects/SelectBoolean';
import SelectRole from '@selects/SelectRole';
import SelectRoles from '@selects/SelectRoles';
import { cast } from '@utils/util';
import React, { FC, memo } from 'react';

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

const RoleSettings: FC = () => {
	const classes = useStyles();
	const theme = useTheme();
	const isOnMobile = useMediaQuery(theme.breakpoints.down('sm'));
	const { guildData } = useGuildDataContext();
	const { guildSettings } = useGuildSettingsContext();
	const { setGuildSettingsChanges } = useGuildSettingsChangesContext();

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
					title={ConfigurableRemoveInitialRole.name}
					description={ConfigurableRemoveInitialRole.tooltip}
					currentValue={guildSettings['roles.removeInitial']}
					onChange={event =>
						setGuildSettingsChanges({
							'roles.removeInitial': event.target.checked
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
					{ConfigurableRoles.map(({ name, tooltip, key }, index) => (
						<SelectRole
							key={index}
							label={name}
							value={cast<string | null>(guildSettings[key])}
							onChange={newRole =>
								setGuildSettingsChanges({
									[key]: newRole
								})
							}
							guild={guildData}
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
						key={ConfigurableRoles.length + 1}
						tooltipTitle={ConfigurablePublicRoles.tooltip}
						value={guildSettings['roles.public']}
						onChange={newRoles =>
							setGuildSettingsChanges({
								'roles.public': newRoles
							})
						}
						guild={guildData}
						label={ConfigurablePublicRoles.name}
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

export default memo(RoleSettings);
