const Subscription = {
  chatBox: {
    subscribe(parent, { chatBoxName }, { db, pubsub }, info) {
      return pubsub.asyncIterator(chatBoxName);
    }
  },
}

export default Subscription;