import { Box, Button, Typography } from '@mui/material';

export const Sidebar = () => {
	return (
		<Box
			sx={{
				width: '200px',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
			}}
		>
			<Box>
				<Typography variant="h5" sx={{ padding: '10px' }}>
					ChatApp
				</Typography>
			</Box>
			<Box sx={{ padding: '8px' }}>
				<Button variant="outlined" sx={{ width: '100%' }}>
					ログアウト
				</Button>
			</Box>
		</Box>
	);
};
