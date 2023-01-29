import type { CustomCommands } from '@config/types/ConfigurableData';
import type { CustomCommand } from '@config/types/GuildSettings';
import { useGuildSettingsChangesContext } from '@contexts/Settings/GuildSettingsChangesContext';
import { useGuildSettingsContext } from '@contexts/Settings/GuildSettingsContext';
import Section from '@layout/Settings/Section';
import SimpleGrid from '@material/SimpleGrid';
import FormikSwitch from '@mods/Formik/FormikSwitch';
import FormikTextField from '@mods/Formik/FormikTextField';
import GfmReactMarkdown from '@mods/ReactMarkdown/GfmReactMarkdown';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ColorPicker from '@presentational/ColorPicker/ColorPicker';
import { parse, REGEXP } from '@utils/Color';
import { Form, Formik } from 'formik';
import { forwardRef, Fragment, memo, useMemo } from 'react';
import { Components, Virtuoso } from 'react-virtuoso';
import { boolean, object, string } from 'yup';

import { Button, Grid, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Typography, useTheme } from '@mui/material';

const CustomCommandSettings = () => {
	const theme = useTheme();
	const { guildSettings } = useGuildSettingsContext();
	const { setGuildSettingsChanges } = useGuildSettingsChangesContext();

	const validationSchema = object({
		id: string()
			.required('A tag must have a name')
			.max(50, 'A tag name must be 50 or less characters long.')
			.matches(/[^`\u200B]/, {
				excludeEmptyString: true,
				message: 'A tag name may not have a grave accent nor invisible characters.'
			}),
		content: string().required('A custom command must have content to send').max(1950, 'Custom command length cannot exceed 1950 characters'),
		color: string()
			.required()
			.default('#1E88E5')
			.matches(REGEXP.HEX, 'That is not a valid colour, please use the colour picker or type a valid HEX colour.')
			.ensure(),
		embed: boolean().defined().default(false)
	});

	const mergeCustomCommands = (prev: CustomCommand[], next: CustomCommand) => {
		const clone = prev.slice();
		const prevEntry = clone.find((command) => command.id.toLowerCase() === next.id.toLowerCase());

		if (prevEntry !== undefined) {
			clone[clone.indexOf(prevEntry)] = next;
			return clone;
		}

		return [...clone, next];
	};

	const sortCommands = (firstCommand: CustomCommand, secondCommand: CustomCommand) =>
		firstCommand.id.toLowerCase() < secondCommand.id.toLowerCase() ? -1 : firstCommand.id.toLowerCase() > secondCommand.id.toLowerCase() ? 1 : 0;

	const sortedCommands = guildSettings.customCommands.sort(sortCommands);

	const VirtuosoComponents = useMemo<Components>(
		() => ({
			List: forwardRef(({ style, children }, listRef) => (
				<List style={{ ...style, width: '100%' }} ref={listRef} component="nav">
					{children}
				</List>
			)),

			Item: ({ children, ...props }) => (
				<ListItem {...props} button style={{ margin: 0 }}>
					{children}
				</ListItem>
			)
		}),
		[]
	);

	function mapCustomCommandToFormCustomCommand(customCommand: CustomCommand): CustomCommands.Form {
		const hexColor = parse(customCommand.color.toString()).Hex;
		const hexColorString = `#${hexColor.r}${hexColor.g}${hexColor.b}`;

		return {
			id: customCommand.id,
			content: customCommand.content,
			color: hexColorString,
			embed: customCommand.embed
		};
	}

	return (
		<Fragment>
			<Formik<CustomCommands.Form>
				initialValues={{
					id: '',
					content: '',
					color: '#1E88E5',
					embed: false
				}}
				enableReinitialize
				validationSchema={validationSchema}
				onSubmit={({ id, content, color, embed }, { setSubmitting, resetForm }) => {
					setSubmitting(true);

					setGuildSettingsChanges({
						customCommands: mergeCustomCommands(guildSettings.customCommands, {
							id: id.toLowerCase(),
							content,
							color: parse(color || '#1E88E5').B10.value,
							embed,
							aliases: []
						})
					});

					resetForm();
					setSubmitting(false);
				}}
			>
				{(formikProps) => (
					<>
						<Section title="Add Command">
							<SimpleGrid
								direction="row"
								justifyContent="flex-start"
								gridItemProps={{
									xs: 12,
									sm: 12,
									md: 12,
									lg: 12,
									xl: 12
								}}
							>
								<Form>
									<Grid
										spacing={4}
										container
										direction="row"
										justifyContent="space-between"
										alignContent="stretch"
										alignItems="flex-end"
									>
										<Grid item xs={12} sm={12} md={8} lg={8}>
											<FormikTextField<CustomCommands.Form>
												name="id"
												label="Name"
												TextFieldProps={{
													placeholder: 'Fill in the name for your custom command here',
													autoComplete: 'off',
													margin: 'normal',
													autoFocus: true
												}}
											/>
										</Grid>
										<Grid item xs={12} sm={12} md={4} lg={2}>
											<ColorPicker<CustomCommands.Form>
												name="color"
												label="Color"
												TextFieldProps={{
													placeholder: 'Pick a color for the embedded message',
													autoComplete: 'off',
													autoCorrect: 'off',
													autoCapitalize: 'off',
													spellCheck: false,
													margin: 'normal',
													fullWidth: true
												}}
											/>
										</Grid>
										<Grid item xs={12} sm={12} md={12} lg={2}>
											<FormikSwitch<CustomCommands.Form> name="embed" title="Embed" />
										</Grid>
									</Grid>
									<FormikTextField<CustomCommands.Form>
										name="content"
										label="Content / Response"
										TextFieldProps={{
											placeholder: 'Fill in the content for your custom command here',
											autoComplete: 'on',
											autoCorrect: 'on',
											autoCapitalize: 'on',
											spellCheck: true,
											margin: 'normal',
											autoFocus: true,
											minRows: 3,
											multiline: true,
											sx: {
												pb: 3
											},
											FormHelperTextProps: {
												sx: {
													position: 'absolute',
													bottom: (theme) => theme.spacing(-0.5),
													top: 'unset'
												}
											}
										}}
									/>
									<Button
										fullWidth
										sx={{
											minHeight: {
												lg: 'inherit',
												md: 60,
												xs: 'inherit'
											}
										}}
										type="submit"
										color="primary"
										variant="contained"
									>
										Add
									</Button>
								</Form>
							</SimpleGrid>
						</Section>
						<Section
							title="Registered Custom Commands"
							sx={{
								mt: 3
							}}
						>
							<SimpleGrid
								direction="row"
								justifyContent="flex-start"
								gridItemProps={{
									xs: 12,
									sm: 12,
									md: 12,
									lg: 12,
									xl: 12
								}}
							>
								{guildSettings.customCommands.length > 0 ? (
									<Virtuoso
										totalCount={sortedCommands.length}
										overscan={3}
										style={{
											height: theme.spacing(40),
											width: '100%',
											margin: theme.spacing(1)
										}}
										components={VirtuosoComponents}
										itemContent={(index) => (
											<>
												<ListItemText
													disableTypography
													primary={
														<Typography
															variant="body1"
															sx={{
																textDecoration: 'underline',
																fontWeight: 'bolder'
															}}
														>
															{guildSettings.prefix}
															{sortedCommands[index].id.toLowerCase()}
														</Typography>
													}
													secondary={
														<Typography component="div" variant="body2">
															<GfmReactMarkdown source={sortedCommands[index].content} />
														</Typography>
													}
												/>
												<ListItemSecondaryAction>
													<IconButton
														edge="end"
														onClick={() =>
															formikProps.setValues(mapCustomCommandToFormCustomCommand(sortedCommands[index]))
														}
														size="large"
													>
														<EditIcon />
													</IconButton>
													<IconButton
														edge="end"
														onClick={() =>
															setGuildSettingsChanges({
																customCommands: guildSettings.customCommands.filter(
																	(command) => command.id.toLowerCase() !== sortedCommands[index].id.toLowerCase()
																)
															})
														}
														size="large"
													>
														<DeleteIcon />
													</IconButton>
												</ListItemSecondaryAction>
											</>
										)}
									/>
								) : (
									<Typography>You have no registered custom commands!</Typography>
								)}
							</SimpleGrid>
						</Section>
					</>
				)}
			</Formik>
		</Fragment>
	);
};

export default memo(CustomCommandSettings);
