import React from "react";

interface Message {
  type: 0 | 1;
  content: string;
}

interface MessageProps {
  message: Message;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const { type, content } = message;

  return (
    <div
      className={`fixed bottom-4 right-4 p-4 rounded shadow-lg text-white ${
        type === 0 ? "bg-red-500" : "bg-green-500"
      }`}
    >
      {content}
    </div>
  );
};

export default Message;
