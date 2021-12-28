import { checkUser, newUser, makeName, checkChatBox, newChatBox, checkMessage, newMessage } from './utility';

const Mutation = {
  async createChatBox(parent, { name1, name2 }, { db, pubsub }, info) {
    if (!name1 || !name2) {
      throw new Error("Missing chatBox name for CreateChatBox");
    }
    if (!(await checkUser(db, name1, "createChatBox"))) {
      console.log("User does not exist for CreateChatBox" + name1);
      await newUser(db, name1);
    }
    if (!(await checkUser(db, name2, "createChatBox"))) {
      console.log("User does not exist for CreateChatBox" + name2);
      await newUser(db, name2);
    }

    const chatBoxName = makeName(name1, name2);
    const chatBox = await checkChatBox(db, chatBoxName, "createChatBox");

    if (!chatBox) {
      return await newChatBox(db, chatBoxName);
    }
    return chatBox;
  },

  async createMessage(parent, { from, to, message }, { db, pubsub }, info) {
    const { chatBox, sender } = await checkMessage(db, from, to, message, "createMessage");
    if (!chatBox) {
      throw new Error("ChatBox not found for createMessage");
    }
    if (!sender) {
      throw new Error("User no found: "+ from);
    }

    const chatBoxName = makeName(from, to);
    const newMsg = await newMessage(db, sender.id, message);

    await db.ChatBoxModel.updateOne({ name: chatBoxName }, { $push: { messages: newMsg } });

    pubsub.publish(chatBoxName, {
      chatBox: { mutation: "CREATE", data: newMsg },
    });
    return newMsg;
  },

  async clearMessage(parent, { chatBoxName }, { db, pubsub }, info) {
    await db.ChatBoxModel.updateOne({ name: chatBoxName }, { $set: { messages: [] }});
    pubsub.publish(chatBoxName, {
      chatBox: { mutation: "DELETE", data: null },
    });
    return chatBoxName;
  }
};

export default Mutation;