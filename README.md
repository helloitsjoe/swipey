# Swipey

## Usage

Swipey exports an `onSwipe` function and a set of `Directions` (`UP`, `DOWN`,
`LEFT`, `RIGHT`). `onSwipe` takes a direction and a handler, and attaches an
event listener to the window that will call the handler if a user swipes in that
direction.

```js
import onSwipe, { Directions } from 'swipey';

const handleLeft = () => console.log('You swiped left!');
const handleRight = () => console.log('You swiped right!');

onSwipe(Directions.LEFT, handleLeft);
onSwipe(Directions.RIGHT, handleRight);
```

A common use is pull-to-refresh:

```js
onSwipe(DOWN, () => window.location.reload(), { fromTop: true });
```

## Options

`onSwipe` also takes a few config options:

### `delta: number` **(default `100`)**

The distance in pixels between `touchStart` and `touchEnd` required to trigger
the handler

### `timeout: number` **(default `Infinity`)**

If `touchEnd` fires after the timeout, the handler will not fire

### `fromTop: boolean` **(default `false`)**

If this is `true`, handler will only fire when swiping from the top of the
document

### `element: HtmlElement` **(default `document`)**

The element to apply the swipe handlers to. Events will bubble normally, so if
you want to isolate the swipe to an element, call `event.stopPropagation()` in
the handler.

## Cleanup

`onSwipe` returns a function that removes event listeners when called.

```js
const reload = () => window.location.reload();

const offDown = onSwipe(Directions.DOWN, reload, { fromTop: true });

// This removes the listener:
offDown();
```
