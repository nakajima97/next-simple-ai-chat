import type { AppProps } from 'next/app';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { themeOptions } from '@/styles/themeOptions';

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
