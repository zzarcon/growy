require('../src');

const init = () => {
  const element = document.querySelector('#demo-area');

  element.addEventListener('onenter', onenter);
}

const onenter = function() {
  console.log('onenter')
};

document.addEventListener('DOMContentLoaded', init);