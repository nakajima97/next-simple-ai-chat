import { getAuth } from '@/libs/firebase/firebase';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
	Avatar,
	Box,
	Button,
	Checkbox,
	FormControlLabel,
	Grid,
	Link,
	TextField,
	Typography,
} from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const LoginForm = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const router = useRouter();

	const auth = getAuth();

	const handleSubmit = async () => {
		try {
			console.log('submit');

			await signInWithEmailAndPassword(auth, email, password);

			router.push('/chat');
		} catch (error) {
			console.error(error);
		}
	};

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const canLogin = email !== '' && password !== '';

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
				Sign in
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
					value={email}
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
					value={password}
					onChange={handlePasswordChange}
				/>
				<FormControlLabel
					control={<Checkbox value="remember" color="primary" />}
					label="アカウントを記憶する"
				/>
				<Button
					type="button"
					fullWidth
					variant="contained"
					sx={{ mt: 3, mb: 2 }}
					disabled={!canLogin}
					onClick={handleSubmit}
				>
					Sign In
				</Button>
				<Grid container>
					<Grid item xs>
						<Link href="#" variant="body2">
							パスワードを忘れた場合はこちら
						</Link>
					</Grid>
					<Grid item>
						<Link href="/register" variant="body2">
							新規登録
						</Link>
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
};
