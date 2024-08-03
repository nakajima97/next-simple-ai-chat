import { Box, Button, TextField, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { BallonProps, Balloon } from '@/components/Balloon';

const Chat = () => {
	const theme = useTheme();

  const chatHistory: BallonProps[] = [
    { text: 'こんにちは！', direction: 'left' },
    { text: 'こんにちは、こちらこそ！', direction: 'right' },
    { text: 'MUIで吹き出しコンポーネントを作成しています。', direction: 'left' },
  ];

	return (
		<Box sx={{ display: 'flex', height: '100dvh' }}>
			<Box
				sx={{
					width: '200px',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
				}}
			>
				<Box>
					<Typography variant="h5" sx={{ padding: '10px' }}>
						ChatApp
					</Typography>
				</Box>
				<Box>
					<Button variant="outlined" sx={{ width: '100%' }}>
						ログアウト
					</Button>
				</Box>
			</Box>
			<Box
				sx={{
					flexGrow: 1,
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				<Box>
					<Typography
						variant="h5"
						sx={{
							padding: '10px',
							backgroundColor: theme.palette.primary.main,
						}}
					>
						Chat
					</Typography>
				</Box>
				<Box sx={{ flexGrow: 1, padding: '10px', width: '100%'}}>
					{chatHistory.map((chat, index) => (
            <Balloon key={index} text={chat.text} direction={chat.direction} />
          ))}
				</Box>
				<Box sx={{ display: 'flex' }}></Box>
				<Box sx={{ display: 'flex', gap: 1, padding: '8px' }}>
					<TextField label="メッセージを入力" sx={{ flexGrow: 1 }} />
					<Button variant="contained">送信</Button>
				</Box>
			</Box>
		</Box>
	);
};

export default Chat;
