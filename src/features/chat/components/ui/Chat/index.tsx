import { Box, Button, TextField, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { Balloon } from '../Balloon';
import { useChatLogic } from '@/features/chat/hooks/useChatLogic';

const chatContainerId = 'chat-container';

export const Chat = () => {
	const { chatHistory, message, chatEndRef, handleChangeMessage, handleSendMessage } = useChatLogic();

	return (
		<>
			<Box
				sx={{
					flexGrow: 1,
					padding: '10px',
					width: '100%',
					overflowY: 'scroll',
				}}
				id={chatContainerId}
			>
				{chatHistory.map((chat) => (
					<Balloon
						key={chat.id}
						text={chat.content}
						direction={chat.role === 'user' ? 'left' : 'right'}
					/>
				))}
				<div ref={chatEndRef} />
			</Box>
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
