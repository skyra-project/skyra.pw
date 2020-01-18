import React, { Fragment, useState } from 'react';
import { Box, Button, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, TextField, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import Section from 'components/Section';
import scss from 'stylesheets/modules/CustomCommands.module.scss';

const CustomCommandsPage = props => {
	const [newTag, setNewTag] = useState(['', '']);

	const { tags, prefix } = props.guildSettings;

	return (
		<Fragment>
			<Section title="Add Command">
				<Box className={scss.container}>
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

							props.patchGuildData({ tags: [...tags, newTag] });
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
				<Box className={scss.container}>
					<List>
						{tags.length > 0 ? (
							tags.map(([name, content]) => (
								<ListItem key={name}>
									<ListItemText primary={prefix + name} secondary={content} />
									<ListItemSecondaryAction>
										<IconButton
											edge="end"
											onClick={() => props.patchGuildData({ tags: tags.filter(tag => tag[0] !== name) })}
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
