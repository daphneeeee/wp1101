import { gql } from '@apollo/client/core';

export const CHATBOX_QUERY = gql`
query chatBox(
  $chatBoxName: String!
) {
  chatBox (
    chatBoxName: $chatBoxName
  ){
    name
    messages {
      sender {
        name
      }
      body
    }
  }
}
`