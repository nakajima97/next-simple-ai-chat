import { marked } from "marked";
import DOMPurify from 'dompurify';
import { useEffect, useState } from "react";

type Props = {
  text: string
}

export const Markdown = ({text}: Props) => {
  const [html, setHtml] = useState('');

  useEffect(() => {
    (async () => {
      const clean = DOMPurify.sanitize(text);
      const html = await marked(clean);
      setHtml(html);
  })();
  }, [text]);

  return (
    <div dangerouslySetInnerHTML={{ __html: html }} />
  );
}