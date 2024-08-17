import { Box, Typography, useTheme } from '@mui/material';

export const Header = () => {
	const theme = useTheme();

	return (
		<Box>
			<Typography
				variant="h5"
				sx={{
					padding: '10px',
					backgroundColor: theme.palette.primary.main,
				}}
			>
				Chat
			</Typography>
		</Box>
	);
};
