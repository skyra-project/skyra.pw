import { ConfigurableRemoveInitialRole, ConfigurableRoles } from '@config/SettingsDataEntries';
import { useGuildDataContext } from '@contexts/Settings/GuildDataContext';
import { useGuildSettingsChangesContext } from '@contexts/Settings/GuildSettingsChangesContext';
import { useGuildSettingsContext } from '@contexts/Settings/GuildSettingsContext';
import PageHeader from '@layout/Settings/PageHeader';
import Section from '@layout/Settings/Section';
import SimpleGrid from '@material/SimpleGrid';
import { cast } from '@sapphire/utilities';
import SelectBoolean from '@selects/SelectBoolean';
import SelectRole, { SelectRoleProps } from '@selects/SelectRole';
import SelectRoles, { SelectRolesProps } from '@selects/SelectRoles';
import { handleResetKey } from '@utils/util';
import { memo, type FC } from 'react';

import { useMediaQuery, useTheme } from '@mui/material';

type SelectCommonProps = Omit<SelectRoleProps, 'value' | 'onChange'> & Omit<SelectRolesProps, 'value' | 'onChange'> & { key: number };

const RoleSettings: FC = () => {
	const theme = useTheme();
	const isOnMobile = useMediaQuery(theme.breakpoints.down('md'));
	const { guildData } = useGuildDataContext();
	const { guildSettings } = useGuildSettingsContext();
	const { guildSettingsChanges, setGuildSettingsChanges } = useGuildSettingsChangesContext();

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
					justifyContent="flex-start"
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
							ButtonProps: {
								fullWidth: true,
								sx: {
									minHeight: {
										lg: 'inherit',
										md: 60,
										xs: 'inherit'
									},
									textAlign: 'left'
								}
							},
							onReset: () => handleResetKey(guildSettingsChanges, setGuildSettingsChanges, key)
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
