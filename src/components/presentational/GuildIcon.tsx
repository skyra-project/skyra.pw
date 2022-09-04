import type { TransformedLoginData } from '@config/types/ApiData';
import LazyAvatar from '@material/LazyAvatar';
import type { SxProps, Theme } from '@mui/material/styles';
import { displayIconURL, getAcronym } from '@utils/util';
import type { FC } from 'react';
import type { ValuesType } from 'utility-types';

interface GuildIconProps {
	guild?: ValuesType<NonNullable<TransformedLoginData['transformedGuilds']>>;
	size?: number;
	LazyAvatarSx?: SxProps<Theme>;
}

const GuildIcon: FC<GuildIconProps> = ({ guild, LazyAvatarSx, size = 128 }) => {
	if (!guild) {
		return null;
	}

	return (
		<LazyAvatar
			sx={{
				color: 'secondary.contrastText',
				bgcolor: 'secondary.main',
				...LazyAvatarSx
			}}
			imgProps={{ height: 256, width: 256 }}
			src={displayIconURL(guild, { size })}
		>
			{getAcronym(guild.name)}
		</LazyAvatar>
	);
};

export default GuildIcon;
