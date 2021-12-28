import { makeName } from "./utility";

const Query = {
  chatBox: async (parent, { chatBoxName }, { db }, info) => {
    const chatBox = await db.ChatBoxModel.findOne({ name: chatBoxName });
    
    if (!chatBox) {
      return new Error(`ChatBox ${chatBoxName} does not exist!`)
    }
    return chatBox;
  },
}

export default Query;