import { AlertProvider } from '@/context/AlertContext';
import { AuthProvider } from '@/context/AuthContext';
import { themeOptions } from '@/styles/themeOptions';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
	const theme = createTheme(themeOptions);

	return (
		<>
			<CssBaseline />
			<ThemeProvider theme={theme}>
				<AuthProvider>
					<AlertProvider>
						<Component {...pageProps} />
					</AlertProvider>
				</AuthProvider>
			</ThemeProvider>
		</>
	);
}
