import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

import {
  useAuth,
  useApiCall,
  socket,
  DashboardHeader,
  ChatMessages,
  ChatInput,
  Container,
  useLoadChat,
  useChatSocket,
} from "./index";


const Chat = () => {
  const { otherUserId } = useParams();
  const { accessToken } = useAuth();
  const { apiCall } = useApiCall();


  const bottomRef = useRef(null);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const { conversationId, messages, currentUserId, otherUser, setMessages } = useLoadChat(otherUserId, apiCall, accessToken, scrollToBottom);

  useChatSocket(conversationId, setMessages, scrollToBottom);

  const sendMessage = async (content) => {
    const res = await apiCall(`/api/messages`, {
      method: "POST",
      body: JSON.stringify({ conversationId, content }),
    });

    const msg = await res.json();
    socket.emit("send_message", msg);
  };

  return (
    <Container>
      <DashboardHeader title={otherUser?.name} navTo="/dashboard" />
      <ChatMessages
        messages={messages}
        bottomRef={bottomRef}
        currentUserId={currentUserId}
      />
      <ChatInput onSend={sendMessage} />
    </Container>
  );
};

export default Chat;
