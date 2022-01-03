import { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Button, Input, Tabs, Badge } from 'antd';
import styled from 'styled-components';
import ChatBox from './ChatBox';
import ChatModal from './ChatModal';
import useChatBox from '../hooks/useChatBox';
import Title from '../components/Title';
import { CREATE_CHATBOX_MUTATION, CREATE_MESSAGE_MUTATION, CLEAR_MESSAGE_MUTATION } from '../graphql/index';

const Wrapper = styled(Tabs)`
  width: 100%;
  height: 300px;
  background: #eeeeee52;
  border-radius: 10px;
  margin: 20px,
  padding: 20px;
  display: flex;
`

const ChatRoom = ({ me, displayStatus }) => {
  const [messageInput, setMessageInput] = useState("");
  const [activeKey, setActiveKey] = useState("");
  const { chatBoxes, createChatBox, removeChatBox } = useChatBox();
  const [modalVisible, setModalVisible] = useState(true);
  const [friend, setFriend] = useState("");
  const chatBoxName = [me, friend].sort().join("_");
  const [newMsgRoom, setNewMsgRoom] = useState("");
  const [count, setCount] = useState(false);
  
  const [startChat] = useMutation(CREATE_CHATBOX_MUTATION);
  const [sendMessage] = useMutation(CREATE_MESSAGE_MUTATION);
  const [clearMessage] = useMutation(CLEAR_MESSAGE_MUTATION);

  const addChatBox = () => {
    setModalVisible(true);
  };

  return (
    <>
      <Title>
        <h1>{me}'s Chat Room</h1>
        <Button 
          type="primary" 
          danger
          onClick={async () => {
            await clearMessage({ variables: { chatBoxName: chatBoxName } });
          }}>
            Clear
          </Button>
      </Title>
      <>
        <Wrapper
          tabBarStyle={{ height: "36px", marginTop: "10px" }}
          type="editable-card"
          activeKey={activeKey}
          onChange={(key) => { setActiveKey(key); setCount(false); }}
          onEdit={(targetKey, action) => {
            if (action === "add") addChatBox();
            else if (action === "remove") {
              setActiveKey(removeChatBox(targetKey, activeKey));
            }
          }}
        >
          {chatBoxes.map((friend) => (
            <Tabs.TabPane 
              tab={friend === newMsgRoom ? <Badge dot={count}>{friend}</Badge> : friend} 
              closable={true} 
              key={friend} 
              animated={true}
            >
              <ChatBox me={me} friend={friend} setNewMsgRoom={setNewMsgRoom} setCount={setCount} key={friend} />
            </Tabs.TabPane>
          ))}
        </Wrapper>
        <ChatModal 
          visible={modalVisible}
          onCreate={ async ({ name }) => {
            if (!name.trim()) {
              displayStatus({
                type: "error",
                msg: "Please enter chatBox name.",
              });
              return;
            }
            setFriend(name);
            await startChat({
              variables: {
                name1: me,
                name2: name,
              },
            });
            setActiveKey(() => {
              const box = chatBoxes.find((box) => box === name);
              if (!box) {
                const newFriend = createChatBox(name);
                return newFriend
              } else {
                displayStatus({
                  type: "error",
                  msg: "ChatBox already opened.",
                });
                return;
              }
            });
            setModalVisible(false);
          }}
          onChange={() => { setModalVisible(false); }}
        />
      </>
      <Input.Search 
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
        enterButton="Send"
        placeholder="Enter message here..."
        onSearch={(msg) => {
          if (!msg.trim()) {
            displayStatus({
              type: "error",
              msg: "Please enter message.",
            });
            return;
          }
          sendMessage({
            variables: { from: me, to: friend, message: messageInput }
          });
          setMessageInput("");
        }}
      />
    </>
  )
}

export default ChatRoom;