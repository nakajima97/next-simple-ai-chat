import { Box } from "@mui/material"
import { Balloon } from "../Balloon"
import { Messages } from "@/types/openAi"

type Props = {
  chatHistory: Messages
  chatEndRef: any
}

const chatContainerId = 'chat-container';

export const ChatHistory = ({chatHistory, chatEndRef}: Props) => {
  return (
    <Box
				sx={{
					flexGrow: 1,
					padding: '10px',
					width: '100%',
					overflowY: 'scroll',
				}}
				id={chatContainerId}
			>
				{chatHistory.map((chat) => (
					<Balloon
						key={chat.id}
						text={chat.content}
						direction={chat.role === 'user' ? 'left' : 'right'}
					/>
				))}
				<div ref={chatEndRef} />
			</Box>
  )
}