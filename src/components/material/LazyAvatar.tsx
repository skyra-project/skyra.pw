import Avatar, { AvatarProps } from '@mui/material/Avatar';
import React, { FC, memo } from 'react';

const LazyAvatar: FC<AvatarProps> = (props) => <Avatar {...props} imgProps={{ ...props.imgProps, loading: 'lazy' }} />;

export default memo(LazyAvatar);
