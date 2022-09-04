import type { AvatarProps } from '@mui/material/Avatar';
import { memo, type FC } from 'react';

import { Avatar } from '@mui/material';

const LazyAvatar: FC<AvatarProps> = (props) => <Avatar {...props} imgProps={{ ...props.imgProps, loading: 'lazy' }} />;

export default memo(LazyAvatar);
