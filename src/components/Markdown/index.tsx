import DOMPurify from 'dompurify';
import { marked } from 'marked';
import { useEffect, useState } from 'react';

type Props = {
	text: string;
};

export const Markdown = ({ text }: Props) => {
	const [html, setHtml] = useState('');

	useEffect(() => {
		(async () => {
			const clean = DOMPurify.sanitize(text);
			const html = await marked(clean);
			setHtml(html);
		})();
	}, [text]);

  // HTML文字列をそのまま表示するため、dangerouslySetInnerHTMLを使用
	// biome-ignore lint: lint/security/noDangerouslySetInnerHtml
	return <div dangerouslySetInnerHTML={{ __html: html }} />;
};
