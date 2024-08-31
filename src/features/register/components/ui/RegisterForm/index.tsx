import { AlertContext } from '@/context/AlertContext';
import { getAuth } from '@/libs/firebase/firebase';
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
import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/router';
import type React from 'react';
import { useContext, useState } from 'react';

export const RegisterForm = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { showAlert } = useContext(AlertContext);

	const router = useRouter();

	const auth = getAuth();

	const handleSubmit = async () => {
		try {
			await createUserWithEmailAndPassword(
				auth,
				email,
				password,
			);

			showAlert({ message: 'ログインしました', severity: 'success' });
			router.push('/chat');
		} catch (error: unknown) {
			if (error instanceof FirebaseError) {
				console.error(error);
				console.log({error});
				console.log(error.code);
				if (error.code === 'auth/email-already-in-use') {
					showAlert({ message: 'このメールアドレスは既に登録されています。', severity: 'error' });
				} else if (error.code === 'auth/invalid-email') {
					showAlert({ message: 'メールアドレスの形式が正しくありません。', severity: 'error' });
				} else {
					showAlert({ message: 'エラーが発生して登録に失敗しました。', severity: 'error' });
				}
			}
		}
	};

	const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
	};

	const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
	};

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
