import Message from '../components/Message';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import { CHATBOX_QUERY, CHATBOX_SUBSCRIPTION } from '../graphql';

const Messages = styled.div`
  height: calc(240px - 36px);
  display: flex;
  flex-direction: column;
  overflow: auto;
`

const ChatBox = ({ me, friend, setDot, setNewMsgRoom, ...props }) => {
  const messageFooter = useRef(null);
  const chatBoxName = [me, friend].sort().join('_');

  const { data, loading, subscribeToMore } = useQuery(CHATBOX_QUERY, {
    variables: {
      chatBoxName: chatBoxName,
    },
  });

  const scrollToBottom = () => {
    messageFooter.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [data]);

  useEffect(() => {
    try {
      subscribeToMore({
        document: CHATBOX_SUBSCRIPTION,
        variables: { chatBoxName: chatBoxName },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          else if (subscriptionData.data.chatBox.mutation === "DELETE") {
            return {
              chatBox: {
                name: prev.chatBox.name,
                messages: [],
              },
            };
          }
          setNewMsgRoom(subscriptionData.data.chatBox.data.sender.name);
          setDot(true);
          const newMessage = subscriptionData.data.chatBox.data;
          return {
            chatBox: {
              name: prev.chatBox.name,
              messages: [...prev.chatBox.messages, newMessage],
            },
          }
        },
      });
    } catch (error) {}
  }, [subscribeToMore, friend, me, chatBoxName, setNewMsgRoom, setDot]);

  if (loading) {
    return <p>loading...</p>
  }

  return (
    <Messages>
      {data && data.chatBox.messages.map(({ sender: { name }, body }, i) => (
        <Message me={me} name={name} body={body} key={name + body + i} />
      ))}
      <div ref={messageFooter} />
    </Messages>
  )
}

export default ChatBox;