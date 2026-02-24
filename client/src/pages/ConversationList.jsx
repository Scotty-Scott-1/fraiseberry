import Header from "../components/Utils/Header/Header";
import ConversationnList from "../components/ConversationList/ConversationList";

const ConversationnListPage = () => {
  return(
    <div>
      <Header title="Messages" />
      <ConversationnList />
    </div>
  );
}
export default ConversationnListPage;
