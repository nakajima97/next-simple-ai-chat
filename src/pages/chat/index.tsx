import { Box } from '@mui/material';

const Chat = () => {
	return (
		<Box sx={{ display: 'flex', height: '100vh' }}>
			<Box sx={{width: '200px'}}>
        ナビゲーションバー
      </Box>
			<Box sx={{ flexGrow: 1, backgroundColor: 'red', height: '100%' }}>
				チャット画面
			</Box>
		</Box>
	);
};

export default Chat;
