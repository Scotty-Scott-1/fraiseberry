import { useEffect, useState } from "react";
import { useApiCall } from "../../../services/useApiCall";

const useLoadChat = ( {otherUserId, scrollToBottom }) => {

  const [conversationId, setConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [otherUser, setOtherUser] = useState(null);
  const { apiCall } = useApiCall();


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

    loadChat();
  }, [otherUserId, scrollToBottom, apiCall]);

  return { conversationId, messages, currentUserId, otherUser, setMessages };
};

export default useLoadChat;
