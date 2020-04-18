import {
	Box,
	Button,
	createStyles,
	IconButton,
	List,
	ListItem,
	ListItemSecondaryAction,
	ListItemText,
	makeStyles,
	TextField,
	Typography
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Section from 'components/Section';
import { SettingsPageProps } from 'meta/typings/GuildSettings';
import React, { Fragment, PropsWithChildren, useState } from 'react';

const useStyles = makeStyles(() =>
	createStyles({
		container: {
			maxWidth: 500,
			display: 'flex',
			flexDirection: 'column'
		}
	})
);

const CustomCommandsPage = ({ patchGuildData, guildSettings: { tags, prefix } }: PropsWithChildren<SettingsPageProps>) => {
	const classes = useStyles();
	const [newTag, setNewTag] = useState(['', '']);

	return (
		<Fragment>
			<Section title="Add Command">
				<Box className={classes.container}>
					<TextField label="Name" value={newTag[0]} onChange={e => setNewTag([e.target.value, newTag[1]])} margin="normal" />
					<TextField
						multiline
						label="Content / Response"
						value={newTag[1]}
						onChange={e => setNewTag([newTag[0], e.target.value])}
						margin="normal"
						rows="3"
					/>
					<Button
						onClick={() => {
							const [name, content] = newTag;
							if (name.length === 0 || content.length === 0) return;
							if (content.length >= 2000) return;
							if (tags.some(tag => tag[0] === name)) return;

							patchGuildData({ tags: [...tags, newTag] });
							setNewTag(['', '']);
						}}
						color="primary"
						variant="contained"
					>
						Add
					</Button>
				</Box>
			</Section>
			<Section title="Custom Commands">
				<Box className={classes.container}>
					<List>
						{tags.length > 0 ? (
							tags.map(([name, content]) => (
								<ListItem key={name}>
									<ListItemText primary={prefix + name} secondary={content} />
									<ListItemSecondaryAction>
										<IconButton
											edge="end"
											onClick={() => patchGuildData({ tags: tags.filter(tag => tag[0] !== name) })}
										>
											<DeleteIcon />
										</IconButton>
									</ListItemSecondaryAction>
								</ListItem>
							))
						) : (
							<Typography>You have no commands!</Typography>
						)}
					</List>
				</Box>
			</Section>
		</Fragment>
	);
};

export default CustomCommandsPage;
