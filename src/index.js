/**
 * 
 */

const keyCodes = {
  del: 8,
  enter: 13,
  shift: 16
};

const addEvent = (el) => (eventName, cb) => el.addEventListener(eventName, cb);
const px = (value) => `${value}px`;

class Growy extends HTMLTextAreaElement {
  attachedCallback() {
    this.shiftPressed = false;
    this.minHeight = this.getAttribute('min-height') || 50;
    this.resetOnEnter = this.getAttribute('reset-onenter') === 'false' ? false : true;

    this.setInitialStyles();
    this.addEvents();
  }

  addEvents() {
    const on = addEvent(this);

    on('input', this.oninput(this.minHeight));
    on('keyup', this.onkeyup);
    on('keydown', this.onkeydown);
  }

  setInitialStyles() {
    Object.assign(this.style, {
      minHeight: px(this.minHeight),
      resize: 'none',
      outline: 'none',
      padding: 0
    });
  }

  oninput(minHeight) {
    return function() {
      //We need first to reset the height and later read the 'scrollHeight' 
      this.style.height = "";
      const height = Math.max(this.scrollHeight, minHeight);
      this.style.height = px(height);
    };
  }

  onkeyup(e) {
    const code = e.keyCode;
    const hasLength = !!this.value.trim().length;

    if (code === keyCodes.shift) {
      this.shiftPressed = false;
      return;
    }

    if (code !== keyCodes.enter || !hasLength || this.shiftPressed) return;

    this.triggerEvent('onenter');
    this.resetOnEnter && this.clear();
  }

  clear() {
    this.style.height = px(this.minHeight);
    this.value = '';
  }

  triggerEvent(eventName, options) {
    const event = new CustomEvent(eventName, {detail: options});

    this.dispatchEvent(event);
  }

  onkeydown(e) {
    const code = e.keyCode;
    
    if (code !== keyCodes.shift) return;

    this.shiftPressed = true;
  }
};

document.registerElement('growy-area', {
  prototype: Growy.prototype,
  extends: 'textarea'
});

module.exports = Growy;