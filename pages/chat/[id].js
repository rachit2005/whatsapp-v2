import styled from "styled-components";
import Head from "next/head";
import Sidebar from "../../components/Sidebar";
import ChatScreen from "../../components/ChatScreen";
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import getRecipientEmail from "../../utils/getRecipientEmail";

export default function Chat({ chat, messages }) {
  const [user] = useAuthState(auth);

  return (
    <Container>
      <Head>
        <title>Chat with {getRecipientEmail(chat.users, user)}</title>
      </Head>
      <ChatContainer>
        <ChatScreen chat={chat} messages={messages} />
      </ChatContainer>

      <Sidebar />
    </Container>
  );
}

export async function getServerSideProps(context) {
  const ref = db.collection("chats").doc(context.query.id);

  const MessagesRef = await ref
    .collection("messages")
    .orderBy("timestamp", "asc")
    .get();

  const messages = MessagesRef.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .map((mes) => ({
      ...mes,
      timestamp: mes.timestamp.toDate().getTime(),
    }));

  const chatref = await ref.get();
  const chat = {
    id: chatref.id,
    ...chatref.data(),
  };

  console.log(chat, messages);

  return {
    props: {
      messages: JSON.stringify(messages),
      chat: chat,
    },
  };
}

const Container = styled.div`
  display: flex;
`;

const ChatContainer = styled.div`
  flex: 1;
  overflow: scroll;
  height: 100vh;

  ::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;
