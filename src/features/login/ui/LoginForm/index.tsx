import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
	Avatar,
	Box,
	Button,
	Checkbox,
	FormControlLabel,
	Grid,
	Link,
	Paper,
	TextField,
	Typography,
} from '@mui/material';
import { useRouter } from 'next/router';

export const LoginForm = () => {
  const router = useRouter();

	const handleSubmit = () => {
		console.log('submit');
		router.push('/chat');
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
  )
}