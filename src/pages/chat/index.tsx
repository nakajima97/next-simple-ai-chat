import { Box, Button, TextField, Typography } from '@mui/material';

const Chat = () => {
	return (
		<Box sx={{ display: 'flex', height: '100vh' }}>
			<Box sx={{width: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: 'gray'}}>
        <Box>
          ChatApp
        </Box>
        <Box>
        <Button variant='outlined'>ログアウト</Button>
        </Box>
      </Box>
			<Box sx={{ flexGrow: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box>
          <Typography variant='h5' sx={{borderBottom: '1px solid', padding: '10px'}}>Chat</Typography>
        </Box>
				<Box sx={{ flexGrow: 1 }}>会話履歴</Box>
        <Box sx={{ display: 'flex', gap: 1, padding: '8px' }}>
          <TextField label='メッセージを入力' sx={{ flexGrow: 1 }}/>
          <Button variant='contained'>送信</Button>
        </Box>
			</Box>
		</Box>
	);
};

export default Chat;
