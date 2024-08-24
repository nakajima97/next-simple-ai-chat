import { Backdrop, CircularProgress } from '@mui/material';
import type { FC } from 'react';

export const Loading: FC = () => {
	return (
		<Backdrop open={true}>
			<CircularProgress color="primary" />
		</Backdrop>
	);
};
