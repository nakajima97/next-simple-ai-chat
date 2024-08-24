import { useChatLogic } from '@/features/chat/hooks/useChatLogic';
import { ChatForm } from '../ChatForm';
import { ChatHistory } from '../ChatHistory';

export const ChatMain = () => {
	const {
		chatHistory,
		message,
		handleChangeMessage,
		handleSendMessage,
	} = useChatLogic();

	return (
		<>
			<ChatHistory chatHistory={chatHistory} />
			<ChatForm
				message={message}
				handleChangeMessage={handleChangeMessage}
				handleSendMessage={handleSendMessage}
			/>
		</>
	);
};
