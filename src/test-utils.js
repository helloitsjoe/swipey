import { fireEvent } from '@testing-library/dom';
import { Directions } from './index';

const { LEFT, RIGHT, UP, DOWN } = Directions;

export const touchDown = ({ x = 100, y = 100 }) => ({
  touches: [{ clientX: x, clientY: y }],
});
export const touchUp = ({ x = 100, y = 100 }) => ({
  changedTouches: [{ clientX: x, clientY: y }],
});

export const testSwipe = (start, end) => {
  fireEvent.touchStart(document, touchDown(start));
  fireEvent.touchEnd(document, touchUp(end));
};

export const swipes = {
  [LEFT]: () => testSwipe({ x: 250 }, { x: 50 }),
  [RIGHT]: () => testSwipe({ x: 50 }, { x: 250 }),
  [UP]: () => testSwipe({ y: 250 }, { y: 50 }),
  [DOWN]: () => testSwipe({ y: 50 }, { y: 250 }),
};
