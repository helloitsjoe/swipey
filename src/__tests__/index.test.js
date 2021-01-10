import { fireEvent } from '@testing-library/dom';
import onSwipe, { Directions } from '../index';
import { swipes, testSwipe, touchDown, touchUp } from '../test-utils';
import { getTimestamp } from '../utils';

jest.mock('../utils', () => ({
  ...jest.requireActual('../utils'),
  getTimestamp: jest.fn(() => Date.now()),
  __esModule: true,
}));

const { DOWN, LEFT, RIGHT, UP } = Directions;

let handler;
let offSwipe;

beforeEach(() => {
  handler = jest.fn();
  offSwipe = () => {};
});

afterEach(() => {
  window.scrollY = 0;
  jest.clearAllMocks();
  // Remove event listeners
  offSwipe();
});

describe('onSwipe', () => {
  describe('Basic functionality', () => {
    it.each`
      direction
      ${LEFT}
      ${RIGHT}
      ${UP}
      ${DOWN}
    `('Triggers on swipe $direction', ({ direction }) => {
      const otherDirections = Object.values(Directions).filter(
        dir => dir !== direction
      );
      expect(otherDirections.includes(direction)).toBe(false);

      offSwipe = onSwipe(direction, handler);

      otherDirections.forEach(dir => {
        swipes[dir]();
      });

      expect(handler).toBeCalledTimes(0);
      swipes[direction]();
      expect(handler).toBeCalledTimes(1);
      const handlerArg = handler.mock.calls[0][0];
      expect(handlerArg).toBeInstanceOf(TouchEvent);
    });
  });

  describe('Options', () => {
    it('onlyAtTop does not trigger unless window.scrollY is 0', () => {
      offSwipe = onSwipe(DOWN, handler, { fromTop: true });

      window.scrollY = 10;
      testSwipe({ y: 50 }, { y: 250 });
      expect(handler).not.toBeCalled();
      window.scrollY = 0;

      testSwipe({ y: 50 }, { y: 250 });
      expect(handler).toBeCalledTimes(1);
    });

    it('Does not trigger if timeout has passed', () => {
      offSwipe = onSwipe(DOWN, handler, { timeout: 100 });
      getTimestamp.mockReturnValueOnce(0).mockReturnValueOnce(200);

      testSwipe({ y: 50 }, { y: 250 });
      expect(handler).not.toBeCalled();

      // After mocks, should trigger normally
      testSwipe({ y: 50 }, { y: 250 });
      expect(handler).toBeCalledTimes(1);
    });

    it.each`
      direction | touchStart    | touchEndBad  | touchEndGood
      ${DOWN}   | ${{ y: 50 }}  | ${{ y: 70 }} | ${{ y: 250 }}
      ${UP}     | ${{ y: 250 }} | ${{ y: 70 }} | ${{ y: 50 }}
      ${RIGHT}  | ${{ x: 50 }}  | ${{ x: 70 }} | ${{ x: 250 }}
      ${LEFT}   | ${{ x: 250 }} | ${{ x: 70 }} | ${{ x: 50 }}
    `(
      'Does not trigger if minimum $direction deltaY is not met',
      ({ direction, touchStart, touchEndBad, touchEndGood }) => {
        offSwipe = onSwipe(direction, handler, { delta: 200 });

        // pull but not far enough
        testSwipe(touchStart, touchEndBad);
        expect(handler).not.toBeCalled();

        testSwipe(touchStart, touchEndGood);
        expect(handler).toBeCalledTimes(1);
      }
    );

    it('Adds listener to element if provided', () => {
      const div = document.createElement('div');
      div.id = 'test';
      document.body.appendChild(div);
      const element = document.getElementById('test');

      offSwipe = onSwipe(DOWN, handler, { element });

      testSwipe({ y: 50 }, { y: 250 });
      expect(handler).toBeCalledTimes(0);

      fireEvent.touchStart(element, touchDown({ y: 50 }));
      fireEvent.touchEnd(element, touchUp({ y: 250 }));
      expect(handler).toBeCalledTimes(1);
    });
  });

  describe('Event listeners', () => {
    it('Calls handler for each swipe', () => {
      offSwipe = onSwipe(DOWN, handler);
      testSwipe({ y: 50 }, { y: 250 });
      expect(handler).toBeCalledTimes(1);
      testSwipe({ y: 50 }, { y: 250 });
      expect(handler).toBeCalledTimes(2);
    });

    it('Returns a function that removes event listeners', () => {
      offSwipe = onSwipe(DOWN, handler);
      testSwipe({ y: 50 }, { y: 250 });
      expect(handler).toBeCalledTimes(1);

      offSwipe();
      testSwipe({ y: 50 }, { y: 250 });
      // Still only called once
      expect(handler).toBeCalledTimes(1);
    });
  });
});
