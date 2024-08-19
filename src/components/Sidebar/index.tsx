import { getAuth } from '@/libs/firebase/firebase';
import { Box, Button, Typography } from '@mui/material';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/router';

export const Sidebar = () => {
	const router = useRouter();

	const handleLogout = async () => {
		try {
			const auth = getAuth();
			await signOut(auth);

			router.push('/');
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<Box
			sx={{
				width: '200px',
				height: '100%',
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
				<Button variant="outlined" sx={{ width: '100%' }} onClick={handleLogout}>
					ログアウト
				</Button>
			</Box>
		</Box>
	);
};
