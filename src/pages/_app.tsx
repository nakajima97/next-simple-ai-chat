import { themeOptions } from '@/styles/themeOptions';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
	const theme = createTheme(themeOptions);

	return (
		<>
			<CssBaseline />
			<ThemeProvider theme={theme}>
				<Component {...pageProps} />
			</ThemeProvider>
		</>
	);
}
