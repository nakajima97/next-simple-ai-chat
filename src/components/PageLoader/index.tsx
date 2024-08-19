import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import * as React from 'react';

const CircularIndeterminate = () => {
	const theme = useTheme();

	return (
		<Box
			sx={{
				position: 'fixed',
				top: 0,
				left: 0,
				width: '100dvw',
				height: '100dvh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: theme.palette.primary.light,
			}}
		>
			<CircularProgress color="info" />
		</Box>
	);
};

export default CircularIndeterminate;
