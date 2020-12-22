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
  trigger,
  { type = Types.SWIPE, deltaX = 100, deltaY = 100, mustBeAtTopOfScreen = false } = {}
) {
  // TODO: Handle swipe vs drag with elapsed time
  let upX;
  let upY;
  let downX;
  let downY;

  let scrollY;

  // console.log('type', type);

  const setDownY = e => {
    downY = e.touches[0].clientY;
    scrollY = window.scrollY;
  };

  const setDownX = e => {
    downX = e.touches[0].clientX;
  };

  const setUpY = e => {
    upY = e.changedTouches[0].clientY;

    const isInPosition = mustBeAtTopOfScreen ? scrollY === 0 : true;
    const pulledDownEnough = direction === UP ? downY - upY > deltaY : upY - downY > deltaY;

    if (isInPosition && pulledDownEnough) {
      trigger();
    }
  };

  const setUpX = e => {
    upX = e.changedTouches[0].clientX;

    const swipedEnough = direction === LEFT ? downX - upX > deltaX : upX - downX > deltaX;

    if (swipedEnough) {
      trigger();
    }
  };

  const downHandler = direction === DOWN || direction === UP ? setDownY : setDownX;
  const upHandler = direction === DOWN || direction === UP ? setUpY : setUpX;

  document.addEventListener('touchstart', downHandler);
  document.addEventListener('touchend', upHandler);

  return () => {
    document.removeEventListener('touchstart', downHandler);
    document.removeEventListener('touchend', upHandler);
  };
}
