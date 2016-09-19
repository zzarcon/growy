require('webcomponents.js');
require('growy');

const init = () => {
  const element = document.querySelector('#demo-area');

  element.addEventListener('onenter', onenter);
}

const onenter = function() {
  const message = createMessage(this.value);

  appendMessage('.messages', message);
};

const createMessage = value => {
  const msg = document.createElement('div');

  msg.innerText = value;

  return msg;
};

const appendMessage = (selector, message) => {
  const wrapper = document.querySelector(selector);

  wrapper.appendChild(message);
};


document.addEventListener('DOMContentLoaded', init);