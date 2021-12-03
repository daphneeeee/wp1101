import { Button, Tag } from "antd";
import Title from "../Components/Title";
import Message from "../Components/Message";

const ChatRoom = ({ me, messages, clearMessages }) => {
  return (
    <>
      <Title>
        <h1>{me}'s Chat Room</h1>
        <Button type="primary" danger onClick={clearMessages}>
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
    </>
  );
};

export default ChatRoom;
