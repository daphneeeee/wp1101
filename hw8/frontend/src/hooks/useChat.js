import { useState } from "react";

const client = new WebSocket("ws://localhost:4000");

const sendData = async (data) => {
  await client.send(JSON.stringify(data));
};
const sendMessage = (payload) => {
  sendData(["input", payload]);
};
const clearMessage = () => {
  sendData(["clear"]);
};

const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState({});

  client.onmessage = (byteString) => {
    const { data } = byteString;
    const [task, payload] = JSON.parse(data);
    switch (task) {
      case "init": {
        console.log(payload);
        setMessages(() => payload);
        break;
      }
      case "output": {
        setMessages(() => [...messages, ...payload]);
        break;
      }
      case "status": {
        setStatus(payload);
        break;
      }
      case "cleared": {
        setMessages([]);
        break;
      }
      default:
        break;
    }
  };

  return {
    status,
    messages,
    sendMessage,
    clearMessage,
  };
};

export default useChat;
