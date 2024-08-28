import { Loading } from '@/components/Loading';
import { getAuth } from '@/libs/firebase/firebase';
import { type User, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import { type FC, createContext, useEffect, useState } from 'react';

type AuthContextType = {
	user: User | undefined;
};

type AuthProviderProps = {
	children: React.ReactNode;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
	const [user, setUser] = useState<User>();
	const [isLoading, setIsLoading] = useState(true);

	const router = useRouter();

	const unprotectedRoutes = ['/', '/register'];

	const auth = getAuth();

	// ログイン状態が変更されたときに不適切なページにいた際に適切なページにリダイレクトする
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			if (user) {
				setUser(user);
				// ログインしている場合はチャットページにリダイレクトする
				unprotectedRoutes.includes(router.pathname) &&
					(await router.push('/chat'));
			} else {
				// ログインしていない場合はログインページにリダイレクトする
				!unprotectedRoutes.includes(router.pathname) &&
					(await router.push('/'));
			}
			setIsLoading(false);
		});

		return () => unsubscribe();
	}, [auth, router]);

	return (
		<AuthContext.Provider value={{ user }}>
			{isLoading ? <Loading /> : children}
		</AuthContext.Provider>
	);
};
