import CircularIndeterminate from '@/components/PageLoader';
import LoginPage from '@/features/login/components/page/LoginPage';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';

export default function Home() {
	const { redirectToChat, isLoading } = useProtectedRoute();

	// ログインしている場合はチャットページにリダイレクトする
	redirectToChat();

	if (isLoading) {
		return <CircularIndeterminate />;
	}

	return <LoginPage />;
}
