import { useEffect, useState, useRef } from "react";

const useLoadChat = (otherUserId, apiCall, accessToken, scrollToBottom) => {

  const [conversationId, setConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [otherUser, setOtherUser] = useState(null);

  useEffect(() => {
    const loadChat = async () => {
      const res = await apiCall(`/api/chat/bootstrap/${otherUserId}`, {});
      const data = await res.json();
      console.log(data);

      setConversationId(data.conversationId);
      setCurrentUserId(data.currentUserId);
      setOtherUser(data.otherUser);
      setMessages(data.messages);

      scrollToBottom();
    };

    if (accessToken) loadChat();
  }, [accessToken, otherUserId]);

  return { conversationId, messages, currentUserId, otherUser, setMessages };
};

export default useLoadChat;
