import React, { useState } from 'react';
import { Input, Modal } from 'antd';

export default function ChatModal({ visible, onCreate, onChange }) {
  const [name, setName] = useState("");

  return (
    <>
      <Modal
        centered
        visible={visible}
        okText="Start"
        onOk={() => {
          onCreate({ name });
          onChange();
          setName("");
        }}
        onCancel={onChange}
      >
        <Input 
          autoFocus
          placeholder="Create a chatroom with..."
          value={name}
          size='large'
          style={{ 'width': '85%'}}
          onChange={(e) => setName(e.target.value)}
        />
      </Modal>
    </>
  )
}
