import { ConfigurableRemoveInitialRole, ConfigurableRoles } from '#config/SettingsDataEntries';
import { useGuildDataContext } from '#contexts/Settings/GuildDataContext';
import { useGuildSettingsChangesContext } from '#contexts/Settings/GuildSettingsChangesContext';
import { useGuildSettingsContext } from '#contexts/Settings/GuildSettingsContext';
import PageHeader from '#layout/Settings/PageHeader';
import Section from '#layout/Settings/Section';
import SimpleGrid from '#mui/SimpleGrid';
import SelectBoolean from '#selects/SelectBoolean';
import SelectRole, { SelectRoleProps } from '#selects/SelectRole';
import SelectRoles, { SelectRolesProps } from '#selects/SelectRoles';
import { cast } from '#utils/util';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
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

type SelectCommonProps = Omit<SelectRoleProps, 'value' | 'onChange'> & Omit<SelectRolesProps, 'value' | 'onChange'> & { key: number };

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
						{isOnMobile ? ' Long press' : ' Hover over'} a button to get more information about that particular role
					</>
				}
			/>

			<Section title="Toggles">
				<SelectBoolean
					title={ConfigurableRemoveInitialRole.name}
					description={ConfigurableRemoveInitialRole.tooltip}
					currentValue={guildSettings.rolesRemoveInitial}
					onChange={(event) =>
						setGuildSettingsChanges({
							rolesRemoveInitial: event.target.checked
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
					{ConfigurableRoles.map(({ name, tooltip, key }, index) => {
						const props: SelectCommonProps = {
							key: index,
							label: name,
							guild: guildData,
							tooltipTitle: tooltip,
							filterEveryone: true,
							buttonProps: {
								fullWidth: true,
								classes: {
									root: classes.button,
									label: classes.buttonText
								}
							}
						};

						return Array.isArray(guildSettings[key]) ? (
							<SelectRoles
								{...props}
								value={cast<string[]>(guildSettings[key])}
								onChange={(newRole) =>
									setGuildSettingsChanges({
										[key]: newRole
									})
								}
							/>
						) : (
							<SelectRole
								{...props}
								value={cast<string | null>(guildSettings[key])}
								onChange={(newRole) =>
									setGuildSettingsChanges({
										[key]: newRole
									})
								}
							/>
						);
					})}
				</SimpleGrid>
			</Section>
		</>
	);
};

export default memo(RoleSettings);
