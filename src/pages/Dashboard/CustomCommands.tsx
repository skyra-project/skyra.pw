import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import Section from 'components/Section';
import SimpleGrid from 'components/SimpleGrid';
import { FastField, Formik, FormikConfig } from 'formik';
import { TextField } from 'formik-material-ui';
import { SettingsPageProps } from 'meta/typings/GuildSettings';
import React, { Fragment, PropsWithChildren } from 'react';
import ReactMarkdown from 'react-markdown';
import { object, string } from 'yup';

interface NewTagForm {
	name: string;
	content: string;
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		bottomSection: {
			marginTop: theme.spacing(5)
		},
		tagHeader: {
			textDecoration: 'underline',
			fontWeight: 'bolder'
		}
	})
);

const CustomCommandsPage = ({ patchGuildData, guildSettings: { tags, prefix } }: PropsWithChildren<SettingsPageProps>) => {
	const classes = useStyles();
	const validationSchema = object<NewTagForm>({
		name: string().required('A tag must have a name'),
		content: string()
			.required('A custom command must have content to send')
			.max(2000, 'Custom command length cannot exceed 2000 characters')
	});

	const formikConfig: FormikConfig<NewTagForm> = {
		initialValues: {
			name: '',
			content: ''
		},
		enableReinitialize: true,
		validationSchema,
		onSubmit: ({ name, content }, { setSubmitting }) => {
			setSubmitting(true);

			// if (tags.some(tag => tag[0] === name)) return;
			patchGuildData({ tags: [...tags, [name, content]] });

			setSubmitting(false);
		}
	};

	const sortTags = (firstTag: [string, string], secondTag: [string, string]) => {
		return firstTag[0] < secondTag[0] ? -1 : firstTag[0] > secondTag[0] ? 1 : 0;
	};

	return (
		<Fragment>
			<Section title="Add Command">
				<SimpleGrid
					direction="row"
					justify="flex-start"
					gridItemProps={{
						xs: 12,
						sm: 12,
						md: 12,
						lg: 12,
						xl: 12
					}}
				>
					<Formik {...formikConfig}>
						{({ submitForm }) => (
							<>
								<FastField
									component={TextField}
									name="name"
									type="text"
									label="Name"
									placeholder="Fill in the name for your custom command here"
									autoComplete="off"
									autoCorrect="off"
									autoCapitalize="off"
									spellCheck="off"
									margin="normal"
									required
									fullWidth
								/>
								<FastField
									component={TextField}
									name="content"
									type="text"
									label="Content / Response"
									placeholder="Fill in the content for your custom command here"
									autoComplete="on"
									autoCorrect="on"
									autoCapitalize="on"
									spellCheck="on"
									margin="normal"
									rows={3}
									multiline
									required
									fullWidth
								/>
								<Button onClick={submitForm} color="primary" variant="contained">
									Add
								</Button>
							</>
						)}
					</Formik>
				</SimpleGrid>
			</Section>
			<Section title="Registered Custom Commands" className={classes.bottomSection}>
				<SimpleGrid
					direction="row"
					justify="flex-start"
					gridItemProps={{
						xs: 12,
						sm: 12,
						md: 12,
						lg: 12,
						xl: 12
					}}
				>
					<List>
						{tags.length > 0 ? (
							tags.sort(sortTags).map(([name, content]) => (
								<ListItem key={name}>
									<ListItemText
										disableTypography
										primary={
											<Typography variant="body1" classes={{ root: classes.tagHeader }}>
												{prefix + name}
											</Typography>
										}
										secondary={
											<Typography component="div" variant="body2">
												<ReactMarkdown source={content} skipHtml parserOptions={{ gfm: true }} />
											</Typography>
										}
									/>
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
							<Typography>You have no registered custom commands!</Typography>
						)}
					</List>
				</SimpleGrid>
			</Section>
		</Fragment>
	);
};

export default CustomCommandsPage;
