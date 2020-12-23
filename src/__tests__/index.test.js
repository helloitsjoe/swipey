import { fireEvent } from '@testing-library/dom';
import onSwipe, { Directions } from '../index';
import { swipes, testSwipe, touchDown, touchUp } from '../test-utils';

const { DOWN, LEFT, RIGHT, UP } = Directions;

let handler;

beforeEach(() => {
  handler = jest.fn();
});

afterEach(() => {
  window.scrollY = 0;
  jest.clearAllMocks();
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

      onSwipe(direction, handler);

      otherDirections.forEach(dir => {
        swipes[dir]();
      });

      expect(handler).toBeCalledTimes(0);
      swipes[direction]();
      expect(handler).toBeCalledTimes(1);
    });
  });

  describe('Options', () => {
    it('onlyAtTop does not trigger unless window.scrollY is 0', () => {
      onSwipe(DOWN, handler, { onlyAtTop: true });

      window.scrollY = 10;
      testSwipe({ y: 50 }, { y: 250 });
      expect(handler).not.toBeCalled();
      window.scrollY = 0;

      testSwipe({ y: 50 }, { y: 250 });
      expect(handler).toBeCalledTimes(1);
    });

    it.each`
      direction | touchStart    | touchEndBad  | touchEndGood
      ${DOWN}   | ${{ y: 50 }}  | ${{ y: 70 }} | ${{ y: 150 }}
      ${UP}     | ${{ y: 150 }} | ${{ y: 70 }} | ${{ y: 50 }}
      ${RIGHT}  | ${{ x: 50 }}  | ${{ x: 70 }} | ${{ x: 150 }}
      ${LEFT}   | ${{ x: 150 }} | ${{ x: 70 }} | ${{ x: 50 }}
    `(
      'Does not trigger if minimum $direction deltaY is not met',
      ({ direction, touchStart, touchEndBad, touchEndGood }) => {
        onSwipe(direction, handler, { deltaY: 100 });

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

      onSwipe(DOWN, handler, { element });

      testSwipe({ y: 50 }, { y: 250 });
      expect(handler).toBeCalledTimes(0);

      fireEvent.touchStart(element, touchDown({ y: 50 }));
      fireEvent.touchEnd(element, touchUp({ y: 250 }));
      expect(handler).toBeCalledTimes(1);
    });
  });

  describe('Event listeners', () => {
    it('Calls handler for each swipe', () => {
      onSwipe(DOWN, handler);
      testSwipe({ y: 50 }, { y: 250 });
      expect(handler).toBeCalledTimes(1);
      testSwipe({ y: 50 }, { y: 250 });
      expect(handler).toBeCalledTimes(2);
    });

    it('Returns a function that removes event listeners', () => {
      const offSwipe = onSwipe(DOWN, handler);
      testSwipe({ y: 50 }, { y: 250 });
      expect(handler).toBeCalledTimes(1);

      offSwipe();
      testSwipe({ y: 50 }, { y: 250 });
      // Still only called once
      expect(handler).toBeCalledTimes(1);
    });
  });
});
