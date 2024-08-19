import CircularIndeterminate from '@/components/PageLoader';
import ChatPage from '@/features/chat/components/page/ChatPage';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';

const chat = () => {
	const { redirectToLogin, isLoading } = useProtectedRoute();

	// ログインしていない場合はログインページにリダイレクトする
	redirectToLogin();

	if (isLoading) {
		return <CircularIndeterminate />;
	}

	return <ChatPage />;
};

export default chat;
