import { useAutoScroll } from '@/features/chat/hooks/useAutoScroll';
import type { Messages } from '@/types/openAi';
import { Box } from '@mui/material';
import type { MutableRefObject } from 'react';
import { Balloon } from '../Balloon';

type Props = {
	chatHistory: Messages;
	chatEndRef: MutableRefObject<HTMLDivElement | null>;
};

const chatContainerId = 'chat-container';

export const ChatHistory = ({ chatHistory, chatEndRef }: Props) => {
	const { scrollRouteRef, handleScroll } = useAutoScroll({
		messages: chatHistory,
	});

	return (
		<Box
			sx={{
				flexGrow: 1,
				padding: '10px',
				width: '100%',
				overflowY: 'scroll',
			}}
			onScroll={handleScroll}
			ref={scrollRouteRef}
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
	);
};
