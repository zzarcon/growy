# <img src="icon_green.png" width="45" align="left"> Growy
> Textarea-like web component which expands the height as the user types something

### Demo
  TODO: Add gif
  TODO: Create demo page
  TODO: Add demo link

### Features
  - 100% Web Component :sparkling_heart:
  - Dependency free :dizzy:
  - Does one thing right :ok_hand:
  - Works as you will expect :rocket:

### Usage

```html
<textarea id="demo" is="growy-area"></textarea>
```

```javascript
require('growy');

const element = document.getElementById('demo');

element.addEventListener('onenter', function() {
  const value = this.value;

  //Do stuff with the textarea value
});
```

**Additional options**
  
  * **min-height** [default `50`] ```<textarea is="growy-area" min-height="100">```
  * **reset-onenter** [default `true`] ```<textarea is="growy-area" reset-onenter="false">```

**Events**
  
  * **onenter** Fired when the user hits `enter`. It handles when `shift` is presed and doesn't fires the event.

**Methods**

  * **reset** Will clear the textarea value and set the height to the original one (minHeight)

    ```javascript
    const element = document.getElementById('demo');

    element.reset();
    ```

      
### Installation

```
$ npm i growy
```

### Explanation and motivation

- web components
- "is"
- custom event name
- web components status

### Author

[@zzarcon](https://twitter.com/zzarcon) :beers: