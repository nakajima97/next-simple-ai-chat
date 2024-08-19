import AuthLayout from '@/components/AuthLayout';
import { LoginForm } from '../../ui/LoginForm';

export default function Home() {
	return (
		<AuthLayout>
			<LoginForm />
		</AuthLayout>
	);
}
