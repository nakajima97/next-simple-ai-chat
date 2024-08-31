import { Alert, Snackbar } from '@mui/material';
import type React from 'react';
import { type FC, createContext, useState } from 'react';

type AlertType = {
	message: string;
	severity: 'success' | 'error';
};

type AlertContextType = {
	alert: AlertType | null;
	showAlert: (Alert: AlertType) => void;
	hideAlert: () => void;
};

type AlertProviderProps = {
	children: React.ReactNode;
};

export const AlertContext = createContext<AlertContextType>({
	alert: null,
	showAlert: () => {},
	hideAlert: () => {},
});

export const AlertProvider: FC<AlertProviderProps> = ({ children }) => {
	const [alert, setAlert] = useState<AlertType | null>(null);

	const showAlert = ({ message, severity }: AlertType) => {
		setAlert({ message, severity });
	};

	const hideAlert = () => {
		setAlert(null);
	};

	return (
		<AlertContext.Provider value={{ alert: alert, showAlert, hideAlert }}>
			{children}
			<Snackbar
				open={!!alert}
				onClose={hideAlert}
				autoHideDuration={5000}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
			>
				<Alert severity={alert?.severity}>{alert?.message}</Alert>
			</Snackbar>
		</AlertContext.Provider>
	);
};
