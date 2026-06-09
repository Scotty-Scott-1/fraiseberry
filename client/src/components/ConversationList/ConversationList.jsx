import { useEffect, useState } from "react";
import { useAuth } from "../Security/authContext";
import { useApiCall } from "../../services/useApiCall";
import DashboardHeader from "../Utils/DashboardHeader/DashboardHeader";
import Container from "../Utils/Container/Container";
import ConversationItem from "./ConversationItem/ConversationItem";
import { renderConversations } from "./Helpers/renderConvos";
import { useConversations } from "./hooks/useConversations";

const ConversationList = () => {
  const { accessToken } = useAuth();
  const { conversations, loading, error } = useConversations(accessToken);

  return (
    <Container>
      <DashboardHeader title="Messages" navTo="/dashboard" />
      {renderConversations(conversations)}
    </Container>
  );
};

export default ConversationList;
