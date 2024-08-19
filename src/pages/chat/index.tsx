import ChatPage from '@/features/chat/components/page/ChatPage';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';

const chat = () => {
	const { redirectToLogin } = useProtectedRoute();

	// ログインしていない場合はログインページにリダイレクトする
	redirectToLogin();

	return <ChatPage />;
};

export default chat;
