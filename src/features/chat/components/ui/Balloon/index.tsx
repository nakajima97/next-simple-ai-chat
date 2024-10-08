import { Box, Typography, useTheme } from '@mui/material';
import React from 'react';
import { Markdown } from '../Markdown';

type BallonProps = {
	text: string;
	direction?: 'left' | 'right';
};

const Balloon = ({ text, direction = 'left' }: BallonProps) => {
	const theme = useTheme();

	const leftStyles = {
		alignSelf: 'flex-start',
		backgroundColor: theme.palette.primary.light,
		color: theme.palette.primary.contrastText,
		marginLeft: '50px',
	};

	const rightStyles = {
		alignSelf: 'flex-end',
		backgroundColor: theme.palette.secondary.main,
		color: theme.palette.secondary.contrastText,
		marginRight: '50px',
	};

	return (
		<Box
			sx={{
				width: '90%',
				padding: '10px',
				borderRadius: '16px',
				marginBottom: '10px',
				display: 'flex',
				...(direction === 'left' ? leftStyles : rightStyles),
			}}
		>
			<Markdown text={text} />
		</Box>
	);
};

export { Balloon };
export type { BallonProps };
