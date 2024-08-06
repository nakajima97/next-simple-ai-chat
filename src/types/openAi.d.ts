type Message = {
  role: "system" | "user" | "assistant";
  content: string;
  id: string;
};

type Messages = Message[];

export type {
  Message,
  Messages,
}