import { useGuildDataContext } from '@contexts/Settings/GuildDataContext';
import { useGuildSettingsChangesContext } from '@contexts/Settings/GuildSettingsChangesContext';
import { useGuildSettingsContext } from '@contexts/Settings/GuildSettingsContext';
import PageHeader from '@layout/Settings/PageHeader';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import SimpleGrid from '@mui/SimpleGrid';
import Tooltip from '@mui/Tooltip';
import { isNullish } from '@sapphire/utilities';
import SelectChannel from '@selects/SelectChannel';
import SelectRole from '@selects/SelectRole';
import { cast, handleResetKey } from '@utils/util';
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
		sectionSpacer: {
			marginTop: theme.spacing(5),
			[theme.breakpoints.down('md')]: {
				marginTop: theme.spacing(2)
			}
		}
	})
);

const BirthdaySettings: FC = () => {
	const classes = useStyles();
	const { guildData } = useGuildDataContext();
	const { guildSettings } = useGuildSettingsContext();
	const { guildSettingsChanges, setGuildSettingsChanges } = useGuildSettingsChangesContext();

	return (
		<>
			<PageHeader
				title="Birthday reminders"
				subtitle={
					<>
						Here you can configure what I should do when it is someone's birthday in the current server. Note that when configuring the
						"channel", you also have to configure the "message" for the change to work. You can also configure a role, which I will give
						to a user whose birthday is today.
					</>
				}
			/>

			<SimpleGrid
				direction="row"
				justify="flex-start"
				gridItemProps={{
					xs: 12,
					sm: 12,
					md: 12,
					lg: 12,
					xl: 12,
					classes: { root: classes.sectionSpacer }
				}}
			>
				<SelectChannel
					tooltipTitle="The channel where the message will be sent to."
					value={guildSettings.birthdayChannel}
					onReset={() => handleResetKey(guildSettingsChanges, setGuildSettingsChanges, 'birthdayChannel')}
					onChange={(channel: typeof guildSettings.birthdayChannel) => setGuildSettingsChanges({ birthdayChannel: channel })}
					guild={guildData}
					label="Birthday channel"
					ButtonProps={{
						fullWidth: true,
						classes: {
							root: classes.button,
							label: classes.buttonText
						}
					}}
				/>
				<Tooltip
					title={
						<>
							{/* prettier-ignore */}
							A personalized message that will be sent to the channel
							<br />
							{/* prettier-ignore */}
							The following will be replaced with the respective values:
							<br />
							{/* prettier-ignore */}- <code className="white">{'{age}'}</code>: will be replaced with the user's new age.
							<br />
							{/* prettier-ignore */}- <code className="white">{'{age.ordinal}'}</code>: will be replaced with the ordinal version of
							the user's age (for example <code className="white">{'{age.ordinal} birthday'}</code> for{' '}
							<code className="white">18th birthday</code>)<br />
							{/* prettier-ignore */}- <code className="white">{'{user}'}</code>: will be replaced with a mention of the user.
							<br />
							{/* prettier-ignore */}- <code className="white">{'{user.name}'}</code>: will be replaced with just the username of the
							user.
							<br />
							{/* prettier-ignore */}- <code className="white">{'{user.tag}'}</code>: will be replaced with the username + tag (for
							example <code className="white">user#0000</code>){/* prettier-ignore */}
						</>
					}
					placement="top-start"
				>
					<TextField
						multiline
						fullWidth
						helperText={
							isNullish(guildSettings.birthdayChannel) && guildSettings.birthdayMessage
								? 'You must set up the birthday channel as well!'
								: null
						}
						FormHelperTextProps={{
							error: true
						}}
						label="Birthday message"
						value={guildSettings.birthdayMessage ?? ''}
						onChange={(e) =>
							setGuildSettingsChanges({
								birthdayMessage: e.target.value
							})
						}
						margin="normal"
						rows="3"
					/>
				</Tooltip>
				<SelectRole
					label="Birthday role"
					tooltipTitle="A role that will be given to users on their birthday (and removed 24 hours later)."
					guild={guildData}
					value={cast<string | null>(guildSettings.birthdayRole)}
					filterEveryone
					ButtonProps={{
						fullWidth: true,
						classes: {
							root: classes.button,
							label: classes.buttonText
						}
					}}
					onChange={(newRole) =>
						setGuildSettingsChanges({
							birthdayRole: newRole
						})
					}
					onReset={() => handleResetKey(guildSettingsChanges, setGuildSettingsChanges, 'birthdayRole')}
				/>
			</SimpleGrid>
		</>
	);
};

export default memo(BirthdaySettings);
