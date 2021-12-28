import { gql } from '@apollo/client/core';

export const CHATBOX_SUBSCRIPTION = gql`
  subscription chatBox (
    $chatBoxName: String!
  ){ 
    chatBox (
      chatBoxName: $chatBoxName
    ){
      mutation
      data {
        sender {
          name
        }
        body
      }
    }
  }
`