import GeneralPage from 'components/GeneralPage';
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

function GuildCallbackPage() {
	const [guildID, setGuildID] = useState<string | null>(null);

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const id = urlParams.get('guild_id');

		if (id) setGuildID(id);
	}, []);

	return <GeneralPage loading={!guildID}>{guildID && <Redirect to={`/guilds/${guildID}`} />}</GeneralPage>;
}

export default GuildCallbackPage;
