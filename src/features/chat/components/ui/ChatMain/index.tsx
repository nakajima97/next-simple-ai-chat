import { Box, Button, TextField, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { useChatLogic } from '@/features/chat/hooks/useChatLogic';
import { Balloon } from '../Balloon';
import { ChatHistory } from '../ChatHistory';

export const ChatMain = () => {
	const {
		chatHistory,
		message,
		chatEndRef,
		handleChangeMessage,
		handleSendMessage,
	} = useChatLogic();

	return (
		<>
			<ChatHistory chatHistory={chatHistory} chatEndRef={chatEndRef} />
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
		</>
	);
};
