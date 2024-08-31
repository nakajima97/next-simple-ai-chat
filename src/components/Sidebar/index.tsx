import { AlertContext } from '@/context/AlertContext';
import { getAuth } from '@/libs/firebase/firebase';
import { Box, Button, Typography } from '@mui/material';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useContext } from 'react';

export const Sidebar = () => {
	const router = useRouter();
	const { showAlert } = useContext(AlertContext);

	const handleLogout = async () => {
		try {
			const auth = getAuth();
			await signOut(auth);
			showAlert({ message: 'ログアウトしました', severity: 'success' });
			router.push('/');
		} catch (error) {
			showAlert({ message: 'ログアウトに失敗しました', severity: 'error' });
		}
	};

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
				<Button
					variant="outlined"
					sx={{ width: '100%' }}
					onClick={handleLogout}
				>
					ログアウト
				</Button>
			</Box>
		</Box>
	);
};
