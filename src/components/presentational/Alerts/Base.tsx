import type { AlertProps } from '@mui/material/Alert';
import React, { FC, memo } from 'react';

import { Alert as MuiAlert } from '@mui/material';

const AlertBase: FC<AlertProps> = (props) => <MuiAlert elevation={6} variant="filled" {...props} />;

export default memo(AlertBase);
