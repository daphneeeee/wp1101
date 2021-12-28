import styled from "styled-components";
import { Tag } from "antd";

const StyledMessage = styled.div`
  display: inline-flex;
  align-items: center;
  flex-direction: ${(p) => (p.isMe ? 'row-reverse' : 'row')};
  margin: 8px 0;
  & p:first-child {
    margin: 0 5px;
  }
  & p:last-child {
   padding: 2px 5px;
   border-radius: 5px;
   background: #eee;
   color: gray;
   margin: auto 5px;
  }
`;

const Message = ({ me, name, body }) => {
  return (
    <StyledMessage isMe={me === name}>
      <Tag color="blue">{name}</Tag> <p>{body}</p>
    </StyledMessage>
  )
}

export default Message;
