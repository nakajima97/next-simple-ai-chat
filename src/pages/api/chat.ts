import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';
import type { ChatCompletionMessageParam } from 'openai/src/resources/index.js';

const configuration = {
	apiKey: process.env.OPEN_AI_API_KEY,
};

const openAi = new OpenAI(configuration);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== 'POST') {
		return res.status(405).end();
	}

	let messages: ChatCompletionMessageParam[] = [];
	try {
		({ messages } = req.body);
	} catch (error) {
		return res.status(422).json({ message: 'Invalid message' });
	}

	if (!messages || messages.length === 0) {
		return res.status(422).json({ message: 'Invalid message' });
	}

	// completions = 完成、完了、終了
	const completions = await openAi.chat.completions.create({
		messages,
		model: 'gpt-4o-mini',
		stream: true,
	});

	// ChatGPTからのstreamを読み取る
	const reader = completions.toReadableStream().getReader();

	// レスポンスをデコードするためのTextDecoderを作成
	const decoder = new TextDecoder('utf-8');

	// SSEであることを明示
	res.setHeader('Content-Type', 'text/event-stream');
	res.setHeader('Cache-Control', 'no-cache');
	res.setHeader('Connection', 'keep-alive');
	res.setHeader('Content-Encoding', 'none');

	// レスポンスを返す
	res.writeHead(200);

	// ChatGPTからのレスポンスをクライアントに送信
	while (true) {
		const { done, value } = await reader.read();

		if (done) {
			break;
		}

		const decodedValue = decoder.decode(value);
		res.write(`data: ${decodedValue}\n\n`);
	}

	// レスポンスを閉じる
	res.end();
};

export default handler;
