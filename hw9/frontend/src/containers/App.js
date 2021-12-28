import { useState, useEffect } from "react";
import { message } from "antd";
import styled from "styled-components";
import ChatRoom from "./ChatRoom";
import SignIn from "./SignIn";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 500px;
  margin: auto;
`;

const LOCALSTORAGE_KEY = "save-me";

function App() {
  const saveMe = localStorage.getItem(LOCALSTORAGE_KEY);
  const [me, setMe] = useState(saveMe || "");
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    if (signedIn) {
      localStorage.setItem(LOCALSTORAGE_KEY, me);
    }
  }, [signedIn, me]);

  const displayStatus = (payload) => {
    if (payload.msg) {
      const { type, msg } = payload;
      const content = {
        content: msg,
        duration: 0.5,
      };
      switch (type) {
        case "success": {
          message.success(content);
          break;
        }
        case "error":
        default:
          message.error(content);
          break;
      }
    }
  };

  return (
    <Wrapper>
      {signedIn ? (
        <ChatRoom me={me} displayStatus={displayStatus} />
      ) : (
        <SignIn
          me={me}
          setMe={setMe}
          setSignedIn={setSignedIn}
          displayStatus={displayStatus}
        />
      )}
    </Wrapper>
  );
}

export default App;
