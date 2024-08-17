import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
	Avatar,
	Box,
	Button,
	Grid,
	Link,
	TextField,
	Typography,
} from '@mui/material';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import type React from 'react';
import { useState } from 'react';
import { getApp } from '@/libs/firebase/firebase';
import { useRouter } from 'next/router';

export const RegisterForm = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const router = useRouter();

	const app = getApp();
	const auth = getAuth(app);

	const handleSubmit = async () => {
		try {
			const credential = await createUserWithEmailAndPassword(auth, email, password);

			router.push('/chat');
		} catch (error) {
			console.error(error);
		}
	};

	const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
	}

	const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
	}

	return (
		<Box
			sx={{
				my: 8,
				mx: 4,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}
		>
			<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
				<LockOutlinedIcon />
			</Avatar>
			<Typography component="h1" variant="h5">
				Sign up
			</Typography>
			<Box sx={{ mt: 1 }}>
				<TextField
					margin="normal"
					required
					fullWidth
					id="email"
					label="Email Address"
					name="email"
					autoComplete="email"
					autoFocus
					onChange={handleEmailChange}
				/>
				<TextField
					margin="normal"
					required
					fullWidth
					name="password"
					label="Password"
					type="password"
					id="password"
					autoComplete="current-password"
					onChange={handlePasswordChange}
				/>
				<Button
					type="button"
					fullWidth
					variant="contained"
					sx={{ mt: 3, mb: 2 }}
					onClick={handleSubmit}
				>
					SIGN UP
				</Button>
				<Grid container>
					<Grid item>
						<Link href="/" variant="body2">
							ログイン画面に戻る
						</Link>
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
};
