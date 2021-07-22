import { Avatar, Button, IconButton } from "@material-ui/core";
import styled from "styled-components";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import * as EmailValidator from "email-validator";
import { auth, db } from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import Chat from "./Chat";

function Sidebar() {
  const [user] = useAuthState(auth);

  const userChatRef = db
    .collection("chats")
    .where("users", "array-contains", user.email);

  const [chatSnapShot] = useCollection(userChatRef);

  const createChat = () => {
    const input = prompt(
      "Please enter an email address for the user you wish to chat with"
    );

    if (!input) return null;

    if (
      EmailValidator.validate(input) &&
      input !== user.email &&
      !ChatAlreadyExits(input)
    ) {
      db.collection("chats").add({
        users: [user.email, input],
      });
      // we need to add chat in db
    }
  };

  const ChatAlreadyExits = (reciepintEmail) =>
    !!chatSnapShot?.docs.find((chat) => {
      chat.data().users.find((user) => user === reciepintEmail)?.length > 0;
    });

  return (
    <Container>
      <Header>
        <UserAvatar
          onClick={() => {
            auth.signOut();
          }}
          src={user.photoURL}
        />

        <IconContainer>
          <IconButton>
            <ChatIcon onClick={createChat} />
          </IconButton>

          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </IconContainer>
      </Header>

      <Search>
        <SearchIcon />
        <SearchInput placeholder="search here" />
      </Search>

      {/* list of chat */}
      {chatSnapShot?.docs.map((chat) => (
        <Chat key={chat.id} id={chat.id} users={chat.data().users} />
      ))}
    </Container>
  );
}

export default Sidebar;

const Container = styled.div`
  flex: 0.45;
  border-right: 1px solid whitesmoke;
  height: 100vh;
  min-width: 300px;
  max-width: 350px;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const SidebarButton = styled(Button)`
  width: 100%;
  &&& {
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
  }
`;

const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
  justify-content: space-between;
  align-self: center;
  padding: 15px;
  height: 80px;
  border-bottom: 1px solid lightgray;
`;

const UserAvatar = styled(Avatar)`
  cursor: pointer;

  :hover {
    opacity: 0.6;
  }
`;

const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 2px;
`;

const IconContainer = styled.div``;

const SearchInput = styled.input`
  outline-width: 0;
  border: none;
  flex: 1;
`;
