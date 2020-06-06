import Avatar, { AvatarProps } from '@material-ui/core/Avatar';
import React, { memo, PropsWithChildren } from 'react';

export default memo((props: PropsWithChildren<AvatarProps>) => <Avatar {...props} imgProps={{ ...props.imgProps, loading: 'lazy' }} />);
