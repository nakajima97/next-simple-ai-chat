import { Grid, Paper } from '@mui/material';
import type React from 'react';
import type { FC } from 'react';

type Props = {
	children: React.ReactNode;
};

const RegisterPage: FC<Props> = ({ children }) => {
	return (
		<Grid container component="main" sx={{ height: '100vh' }}>
			<Grid
				item
				xs={false}
				sm={4}
				md={7}
				sx={{
					// 背景を指定するときは以下を使う
					// backgroundImage:
					// 	'url("/static/images/templates/templates-images/sign-in-side-bg.png")',

					backgroundColor: (t) =>
						t.palette.mode === 'light'
							? t.palette.grey[50]
							: t.palette.grey[900],
					backgroundSize: 'cover',
					backgroundPosition: 'left',
				}}
			/>
			<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
				{children}
			</Grid>
		</Grid>
	);
};

export default RegisterPage;
