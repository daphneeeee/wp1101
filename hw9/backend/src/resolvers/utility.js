const checkUser = (db, name, errFunc) => {
  if (!name) {
    throw new Error("Missing user name for " + errFunc);
  }
  return db.UserModel.findOne({ name });
};

const newUser = (db, name) => {
  return new db.UserModel({ name }).save();
};

const makeName = (name1, name2) => {
  return [name1, name2].sort().join("_");
};

// Return the found user (can be null)
const checkChatBox = (db, name, errFunc) => {
  if (!name) {
    throw new Error("Missing chatBox name for" + errFunc);
  }
  return db.ChatBoxModel.findOne({ name });
};

// Make sure (from, to) users and chatBox have been created
// Return found { chatBox, sender } (can be null)
const checkMessage = async (db, from, to, message, errFunc) => {
  const chatBoxName = makeName(from, to);
  return {
    chatBox: await checkChatBox(db, chatBoxName, errFunc),
    sender: await checkUser(db, from , errFunc),
    to: await checkUser(db, to, errFunc),
  };
};

const newMessage = async (db, sender, body) => {
  const res = await new db.MessageModel({ sender, body }).save();
  return res;
};

const newChatBox = (db, chatBoxName) => {
  return new db.ChatBoxModel({ name: chatBoxName }).save();
};

export { checkUser, newUser, makeName, checkChatBox, checkMessage, newMessage, newChatBox };