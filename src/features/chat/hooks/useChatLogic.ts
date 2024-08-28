import type { Messages } from '@/types/openAi';
import { useEffect, useRef, useState } from 'react';

export const useChatLogic = () => {
	const [chatHistory, setChatHistory] = useState<Messages>([]);
	const [message, setMessage] = useState('');

	const handleChangeMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setMessage(event.target.value);
	};

	// メッセージ送信とChatGPTからのレスポンスを表示する
	const handleSendMessage = async () => {
		const sendMessage = message.trim();

		if (!sendMessage) {
			return;
		}

		setChatHistory((prevChatHistory) => [
			...prevChatHistory,
			{ role: 'user', content: sendMessage, id: Date.now().toString() },
		]);

		const messages = [...chatHistory, { role: 'user', content: sendMessage }];

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

	return {
		chatHistory,
		message,
		handleChangeMessage,
		handleSendMessage,
	};
};
