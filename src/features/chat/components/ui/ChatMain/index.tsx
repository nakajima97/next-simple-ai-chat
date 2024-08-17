import { useChatLogic } from '@/features/chat/hooks/useChatLogic';
import { ChatHistory } from '../ChatHistory';
import { ChatForm } from '../ChatForm';

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
			<ChatForm message={message} handleChangeMessage={handleChangeMessage} handleSendMessage={handleSendMessage} />
		</>
	);
};
