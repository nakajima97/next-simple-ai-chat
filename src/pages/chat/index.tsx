import { useTheme } from '@mui/material/styles';
import { Box, Button, TextField, Typography } from '@mui/material';

const Chat = () => {
  const theme = useTheme();

	return (
		<Box sx={{ display: 'flex', height: '100vh' }}>
			<Box sx={{width: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
        <Box>
          <Typography variant='h5' sx={{padding: '10px'}}>ChatApp</Typography>
        </Box>
        <Box>
        <Button variant='outlined' sx={{width: '100%'}}>ログアウト</Button>
        </Box>
      </Box>
			<Box sx={{ flexGrow: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box>
          <Typography variant='h5' sx={{padding: '10px', backgroundColor: theme.palette.primary.main}}>Chat</Typography>
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
