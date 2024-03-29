import { useState } from 'react';

const useChatBox = () => {
  const [chatBoxes, setChatBoxes] = useState([]);

  const createChatBox = (friend) => {
    if (chatBoxes.some((name) => (name === friend))) {
      throw new Error(friend + "'s chatBox has already opened.");
    }
    setChatBoxes([...chatBoxes, friend]);
    return friend;
  }

  const removeChatBox = (targetKey, activeKey) => {
    const index = chatBoxes.indexOf(activeKey);
    const newChatBox = chatBoxes.filter((box) => box !== targetKey);
    setChatBoxes(newChatBox);

    return activeKey
      ? activeKey === targetKey
        ? index === 0
          ? ""
          : chatBoxes[index - 1]
        : activeKey
      : activeKey
  }

  return { chatBoxes, createChatBox, removeChatBox };
}

export default useChatBox;