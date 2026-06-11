import ConversationItem from "../ConversationItem/ConversationItem";

export const renderConversations = (conversations) => {
  return conversations.map((c) => (
    <ConversationItem
      key={c.conversationId}
      c={c}
    />
  ));
};
