import { useState, useEffect, useRef } from "react";
import { Button, Tag, Input } from "antd";
import Title from "../components/Title";
import Message from "../components/Message";
import useChat from "../hooks/useChat";

const ChatRoom = ({ me, displayStatus }) => {
  const { status, messages, sendMessage, clearMessage } = useChat();
  const [username, setUsername] = useState(me);
  const [body, setBody] = useState("");

  const bodyRef = useRef();

  useEffect(() => {
    displayStatus(status);
  }, [status, displayStatus]);

  return (
    <>
      <Title>
        <h1>{me}'s Chat Room</h1>
        <Button type="primary" danger onClick={clearMessage}>
          Clear
        </Button>
      </Title>
      <Message>
        {messages.map(({ name, body }, i) => (
          <p className="App-message" key={i}>
            <Tag color="blue">{name}</Tag> {body}
          </p>
        ))}
      </Message>
      <Input
        placeholder="Username"
        value={username}
        style={{ marginBottom: 10 }}
        onChange={(e) => setUsername(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            bodyRef.current.focus();
          }
        }}
      ></Input>
      <Input.Search
        ref={bodyRef}
        enterButton="Send"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Type a message here..."
        onSearch={(msg) => {
          if (!msg || !username) {
            displayStatus({
              type: "error",
              msg: "Please enter a username and a message body.",
            });
            return;
          }
          sendMessage({ name: username, body: msg });
          setBody("");
        }}
      ></Input.Search>
    </>
  );
};

export default ChatRoom;
