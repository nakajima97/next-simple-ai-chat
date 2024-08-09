import { Box, Button, TextField, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { Balloon } from '@/components/Balloon';
import type { Messages } from '@/types/openAi';
import { useState } from 'react';

const chatContainerId = 'chat-container';

const Chat = () => {
	const [chatHistory, setChatHistory] = useState<Messages>([]);
	const [message, setMessage] = useState('');
	const theme = useTheme();

	const handleChangeMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setMessage(event.target.value);
	};

	const  scrollAuto = () => {
		const chatContainer = document.getElementById(chatContainerId);

		if (!chatContainer) return false;

		chatContainer.scrollTop = chatContainer.scrollHeight;
	};

	// メッセージ送信とChatGPTからのレスポンスを表示する
	const handleSendMessage = async () => {
		setChatHistory((prevChatHistory) => [
			...prevChatHistory,
			{ role: 'user', content: message, id: Date.now().toString() },
		]);

		const messages = [...chatHistory, { role: 'user', content: message }];

		setMessage('');

		const response = await fetch('/api/chat', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ messages }),
		});

		const reader = response.body?.getReader();
		const decoder = new TextDecoder('utf-8');

		if (!reader) {
			console.error('Failed to get reader');
			return false;
		}

		setChatHistory((prevChatHistory) => [
			...prevChatHistory,
			{ role: 'assistant', content: '', id: Date.now().toString() },
		]);

		while (true) {
			const { done, value } = await reader.read();
			if (done) break;
			if (!value) continue;

			const lines = decoder.decode(value);
			const jsons = lines
				.split('data: ') // 各行は data: というキーワードで始まる
				.map((line) => line.trim())
				.filter((s) => s); // 余計な空行を取り除く
			for (const json of jsons) {
				try {
					if (json === '[DONE]') {
						return; // 終端記号
					}
					const chunk = JSON.parse(json);
					const text = chunk.choices[0].delta.content || '';
					// textの値をchatHistoryに追加
					// 新しいメッセージをチャット履歴に追加
					setChatHistory((prevChat) =>
						prevChat.map((chat, index) => {
							const lastChatIndex = prevChat.length - 1;
							if (index === lastChatIndex) {
								return {
									...chat,
									content: prevChat[lastChatIndex].content + text,
								};
							}
							return chat;
						}),
					);

					scrollAuto();
				} catch (error) {
					console.error(error);
				}
			}
		}
	};

	return (
		<Box sx={{ display: 'flex', height: '100dvh' }}>
			<Box
				sx={{
					width: '200px',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
				}}
			>
				<Box>
					<Typography variant="h5" sx={{ padding: '10px' }}>
						ChatApp
					</Typography>
				</Box>
				<Box>
					<Button variant="outlined" sx={{ width: '100%' }}>
						ログアウト
					</Button>
				</Box>
			</Box>
			<Box
				sx={{
					flexGrow: 1,
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				<Box>
					<Typography
						variant="h5"
						sx={{
							padding: '10px',
							backgroundColor: theme.palette.primary.main,
						}}
					>
						Chat
					</Typography>
				</Box>
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
			</Box>
		</Box>
	);
};

export default Chat;
