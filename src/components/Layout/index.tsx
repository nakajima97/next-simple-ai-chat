import { Box } from '@mui/material';
import { Header } from '../Header';
import { Sidebar } from '../Sidebar';

type Props = {
	children: React.ReactNode;
};

export const Layout = ({ children }: Props) => {
	return (
		<Box sx={{ display: 'flex', height: '100dvh' }}>
			<Sidebar />
			<Box
				sx={{
					flexGrow: 1,
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				<Header />
				{children}
			</Box>
		</Box>
	);
};
