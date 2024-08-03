type Message = {
  role: "system" | "user" | "bot";
  content: string;
};

type Messages = Message[];

export type {
  Message,
  Messages,
}