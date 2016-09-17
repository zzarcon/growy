/**
 * 
 */

const keyCodes = {
  enter: 13,
  shift: 16
};

class Growy extends HTMLTextAreaElement {
  attachedCallback() {
    this.minHeight = this.getAttribute('min-height') || 50;
    this.shiftPressed = false;

    this.setInitialStyles();
    this.addEvents();
  }

  addEvents() {
    this.addEventListener('input', this.oninput(this.minHeight));
    this.addEventListener('keyup', this.onkeyup);
    this.addEventListener('keydown', this.onkeydown);
  }

  setInitialStyles() {
    this.style.minHeight = `${this.minHeight}px`;
    this.style.resize = 'none';
    this.style.outline = 'none';
    this.style.padding = 0;
  }

  oninput(minHeight) {
    return function() {
      const height = Math.max(this.scrollHeight, minHeight);
      this.style.height = `${height}px`;
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

    //TODO: Is possible to know if an element has an event
    //declared?

    this.triggerEvent('onenter');
    this.resetState();
  }

  resetState() {
    this.style.height = `${this.minHeight}px`;
    this.value = '';
  }

  triggerEvent(eventName, options) {
    const event = new CustomEvent(eventName, {detail: options});

    this.dispatchEvent(event);
  }

  onkeydown(e) {
    if (e.keyCode !== keyCodes.shift) return;

    this.shiftPressed = true;
  }
};

document.registerElement('x-growy', {
  prototype: Growy.prototype,
  extends: 'textarea'
});

module.exports = Growy;