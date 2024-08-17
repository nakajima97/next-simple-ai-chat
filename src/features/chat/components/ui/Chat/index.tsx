import { Box, Button, TextField, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { Balloon } from '../Balloon';
import type { Messages } from '@/types/openAi';
import { useEffect, useRef, useState } from 'react';

const chatContainerId = 'chat-container';

export const Chat = () => {
	const [chatHistory, setChatHistory] = useState<Messages>([]);
	const [message, setMessage] = useState('');
	const theme = useTheme();

	const chatEndRef = useRef<HTMLDivElement | null>(null);
	const isAtBottomRef = useRef(true);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				isAtBottomRef.current = entries[0].isIntersecting;
			},
			{
				threshold: 1.0, // 全体が表示されているかどうかを判断
			},
		);

		if (chatEndRef.current) {
			observer.observe(chatEndRef.current);
		}

		return () => {
			if (chatEndRef.current) {
				observer.unobserve(chatEndRef.current);
			}
		};
	}, []);

	// チャットに文字列が追加されたときに、チャットをスクロールする
	// コード内でchatHistoryは直接参照されていないが、ここが更新されたときにスクロールの処理が必要なため、chatHistoryを依存リストに追加
	// linterによる警告はコメントによて抑制
	// biome-ignore lint:  lint/correctness/useExhaustiveDependencies
	useEffect(() => {
		if (isAtBottomRef.current) {
			chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
		}
	}, [chatHistory]);

	const handleChangeMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setMessage(event.target.value);
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
				} catch (error) {
					console.error(error);
				}
			}
		}
	};

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
