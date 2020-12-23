export const Directions = {
  DOWN: 'DOWN',
  UP: 'UP',
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
};

export const Types = {
  SWIPE: 'SWIPE',
  DRAG: 'DRAG',
};

const { DOWN, UP, LEFT, RIGHT } = Directions;

// TODO: Handle multi-touch
export default function onSwipe(
  direction,
  handler,
  {
    deltaX = 100,
    deltaY = 100,
    element = document,
    onlyAtTop = false,
    type = Types.SWIPE,
  } = {}
) {
  // TODO: Handle swipe vs drag with elapsed time
  let upX;
  let upY;
  let downX;
  let downY;

  let scrollY;

  const setDownY = e => {
    downY = e.touches[0].clientY;
    scrollY = window.scrollY;
  };

  const setDownX = e => {
    downX = e.touches[0].clientX;
  };

  const setUpY = e => {
    upY = e.changedTouches[0].clientY;

    const isInPosition = onlyAtTop ? scrollY === 0 : true;
    const pulledDownEnough =
      direction === UP ? downY - upY >= deltaY : upY - downY >= deltaY;

    if (isInPosition && pulledDownEnough) {
      handler();
    }
  };

  const setUpX = e => {
    upX = e.changedTouches[0].clientX;

    const swipedEnough =
      direction === LEFT ? downX - upX >= deltaX : upX - downX >= deltaX;

    if (swipedEnough) {
      handler();
    }
  };

  const downHandler =
    direction === DOWN || direction === UP ? setDownY : setDownX;
  const upHandler = direction === DOWN || direction === UP ? setUpY : setUpX;

  element.addEventListener('touchstart', downHandler);
  element.addEventListener('touchend', upHandler);

  return () => {
    element.removeEventListener('touchstart', downHandler);
    element.removeEventListener('touchend', upHandler);
  };
}
