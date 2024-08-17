import AuthLayout from '@/components/AuthLayout';
import { RegisterForm } from '@/features/register/components/ui/RegisterForm';
import React from 'react';

const RegisterPage = () => {
	return (
		<AuthLayout>
			<RegisterForm />
		</AuthLayout>
	);
};

export default RegisterPage;
