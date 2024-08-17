import { Box } from "@mui/material";
import { marked } from "marked";

type Props = {
  text: string
}

export const Markdown = ({text}: Props) => {
  const html = marked(text);
  return (
    <Box dangerouslySetInnerHTML={{ __html: html }} />
  );
}