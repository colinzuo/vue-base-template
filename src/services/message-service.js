class MessageService {
  constructor({tag}) {
    this.tag = tag;
    this.nextId = 1;
    this.listener = null;
  }

  add(data) {
    const message = {
      ...data,
      id: this.nextId,
    };
    this.nextId += 1;

    if (this.listener) {
      this.listener.add(message);
    }
  }

  register(listener) {
    console.log(`${this.tag} register ${listener}`);

    this.listener = listener;
  }

  unregister(listener) {
    console.log(`${this.tag} unregister ${listener}`);

    if (listener === this.listener) {
      this.listener = null;
    }
  }
}

export let messageService = new MessageService({
  tag: 'default MessageService'
});

export let gMessageService = messageService;

console.log('After Create MessageService');
