import { getTimestamp, validateOptions } from './utils.js';

export const Directions = {
  DOWN: 'DOWN',
  UP: 'UP',
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
};

const { DOWN, UP, LEFT } = Directions;

// TODO: Handle multi-touch
export default function onSwipe(direction, handler, options = {}) {
  validateOptions(options);

  const {
    delta = 100,
    timeout = Infinity,
    fromTop = false,
    element = document,
  } = options;

  let upX;
  let upY;
  let downX;
  let downY;
  let scrollY;
  let startTimestamp;

  const setDown = e => {
    downX = e.touches[0].clientX;
    downY = e.touches[0].clientY;
    scrollY = window.scrollY;
    startTimestamp = getTimestamp();
  };

  const setUp = e => {
    upX = e.changedTouches[0].clientX;
    upY = e.changedTouches[0].clientY;

    const isInPosition = fromTop ? scrollY === 0 : true;

    const isFarEnough = () => {
      const actualDeltaX = direction === LEFT ? downX - upX : upX - downX;
      const actualDeltaY = direction === UP ? downY - upY : upY - downY;

      const actualDelta = [UP, DOWN].includes(direction)
        ? actualDeltaY
        : actualDeltaX;

      return actualDelta >= delta;
    };

    if (
      isInPosition &&
      isFarEnough() &&
      getTimestamp() - startTimestamp < timeout
    ) {
      handler(e);
    }

    startTimestamp = null;
  };

  element.addEventListener('touchstart', setDown);
  element.addEventListener('touchend', setUp);

  return () => {
    element.removeEventListener('touchstart', setDown);
    element.removeEventListener('touchend', setUp);
  };
}
