import type { Messages } from '@/types/openAi';
import { useCallback, useEffect, useRef, useState } from 'react';

type UseAutoScrollArg = {
	messages: Messages;
};

export const useAutoScroll = ({ messages }: UseAutoScrollArg) => {
	const [canScrollBottom, setCanScrollBottom] = useState<boolean>(true);

	const isAtBottomRef = useRef<boolean>(true);
	const scrollRouteRef = useRef<HTMLDivElement | null>(null);

	// 一番下までスクロールする関数
	const scrollToBottom = useCallback(() => {
		if (scrollRouteRef.current) {
			scrollRouteRef.current.scrollTop = scrollRouteRef.current.scrollHeight;
		}
	}, []);

	// スクロールが一番下まで行っているかどうかを判定する関数
	const handleScroll = () => {
		if (scrollRouteRef.current) {
			const { scrollTop, scrollHeight, clientHeight } = scrollRouteRef.current;
			// スクロールが最下部から一定距離以内に来た場合に判定を行う
			const scrollThreshold = 100;
			const isNearBottom =
				scrollHeight - scrollTop - scrollThreshold <= clientHeight;

			setCanScrollBottom(isNearBottom);
		}
	};

	// メッセージが追加された場合に必要だったらスクロールを一番下まで行う
	// biome-ignore lint: lint/correctness/useExhaustiveDependencies
	useEffect(() => {
		if (canScrollBottom) {
			scrollToBottom();
		}
	}, [messages, canScrollBottom, scrollToBottom]);

	return { scrollRouteRef, handleScroll };
};
