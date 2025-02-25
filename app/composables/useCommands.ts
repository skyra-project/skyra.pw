export const useCommands = () => {
	const client = useClientTrpc();
	const commands = useState<FlattenedCommand[]>('commands', () => []);
	const isLoading = useState<boolean>('isLoading', () => false);
	const selectedCommand = ref<FlattenedCommand | null>(null);

	const handleError = (error: Error, context: string) => {
		captureException(error, { extra: { context } });
		toast.error('Error', {
			description: `Failed to ${context.toLowerCase()}. Please try again.`
		});
	};

	const executeCommand = async (command: FlattenedCommand) => {
		try {
			isLoading.value = true;
			await client.commands.refresh.mutate();
			toast.success('Command executed', {
				description: `Successfully executed: ${command.name}`
			});
		} catch (error) {
			handleError(error as Error, 'Execute Command');
		} finally {
			isLoading.value = false;
		}
	};

	const fetchCommands = async () => {
		isLoading.value = true;
		try {
			await client.commands.refresh.mutate();
			commands.value = await client.commands.getAll.query();
		} catch (error) {
			handleError(error as Error, 'Fetch Commands');
			commands.value = [];
		} finally {
			isLoading.value = false;
		}
	};

	return {
		commands,
		isLoading,
		selectedCommand,
		executeCommand,
		fetchCommands
	};
};
