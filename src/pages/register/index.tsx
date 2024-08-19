import CircularIndeterminate from '@/components/PageLoader';
import RegisterPage from '@/features/register/components/page/RegisterPage';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';

export default function Register() {
	const { redirectToChat, isLoading } = useProtectedRoute();

	// ログインしている場合はチャットページにリダイレクトする
	redirectToChat();

	if (isLoading) {
		return <CircularIndeterminate />;
	}

	return <RegisterPage />;
}
