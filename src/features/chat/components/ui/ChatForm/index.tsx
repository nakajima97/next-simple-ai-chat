import { Box, Button, TextField, Typography, useTheme } from '@mui/material';
import { type FC, useState } from 'react';

type Props = {
	handleChangeMessage: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleSendMessage: () => void;
	message: string;
};

export const ChatForm: FC<Props> = ({
	handleChangeMessage,
	handleSendMessage,
	message,
}) => {
  const theme = useTheme();

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' && e.ctrlKey) {
			handleSendMessage();
		}
	};

	const isDisabled = message.trim() === '';

	return (
		<Box>
			<Typography align='right' sx={{fontSize: '12px', paddingRight: '16px', color: theme.palette.secondary.dark }}>ctrl + enterで送信</Typography>
			<Box sx={{ display: 'flex', gap: 1, padding: '8px' }}>
				<TextField
					label="メッセージを入力"
					sx={{ flexGrow: 1 }}
					value={message}
					multiline
					onChange={handleChangeMessage}
					onAbort={handleKeyDown}
				/>
				<Button variant="contained" onClick={handleSendMessage} disabled={isDisabled}>
					送信
				</Button>
			</Box>
		</Box>
	);
};
