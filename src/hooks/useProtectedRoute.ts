import { getAuth } from "@/libs/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";

export const useProtectedRoute = () => {
  const router = useRouter();

  /**
   * ログインしていない場合はログインページにリダイレクトする
   */
  const redirectToLogin = () => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/");
      }
    });
  }

  /**
   * ログインしている場合はチャットページにリダイレクトする
   */
  const redirectToChat = () => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/chat");
      }
    });
  }

  return {
    redirectToLogin,
    redirectToChat,
  };
}