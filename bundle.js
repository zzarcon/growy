(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
require('growy');

const init = () => {
  const element = document.querySelector('#demo-area');

  element.addEventListener('onenter', onenter);
}

const onenter = function() {
  console.log('onenter')
};

document.addEventListener('DOMContentLoaded', init);
},{"growy":2}],2:[function(require,module,exports){
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
},{}]},{},[1]);
