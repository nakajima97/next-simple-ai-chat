import { Box, Button, TextField } from '@mui/material';
import type { FC } from 'react';

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
	return (
		<Box sx={{ display: 'flex', gap: 1, padding: '8px' }}>
			<TextField
				label="メッセージを入力"
				sx={{ flexGrow: 1 }}
				onChange={handleChangeMessage}
				value={message}
			/>
			<Button variant="contained" onClick={handleSendMessage}>
				送信
			</Button>
		</Box>
	);
};
