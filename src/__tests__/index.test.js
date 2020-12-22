import { fireEvent } from '@testing-library/dom';
import onSwipe, { Directions } from '../index';

const { DOWN, LEFT, RIGHT, UP } = Directions;

const touchDown = ({ x = 100, y = 100 }) => ({ touches: [{ clientX: x, clientY: y }] });
const touchUp = ({ x = 100, y = 100 }) => ({ changedTouches: [{ clientX: x, clientY: y }] });

const testSwipe = (start, end) => {
  fireEvent.touchStart(document, touchDown(start));
  fireEvent.touchEnd(document, touchUp(end));
};

let trigger;

beforeEach(() => {
  trigger = jest.fn();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('onSwipe', () => {
  it('Triggers on swipe left', () => {
    onSwipe(LEFT, trigger);
    testSwipe({ x: 250 }, { x: 50 });
    expect(trigger).toBeCalledTimes(1);
  });

  it('Triggers on swipe right', () => {
    onSwipe(RIGHT, trigger);
    testSwipe({ x: 50 }, { x: 250 });
    expect(trigger).toBeCalledTimes(1);
  });

  it('Triggers on swipe up', () => {
    onSwipe(UP, trigger);
    testSwipe({ y: 250 }, { y: 50 });
    expect(trigger).toBeCalledTimes(1);
  });

  it('Triggers on swipe down', () => {
    onSwipe(DOWN, trigger);
    testSwipe({ y: 50 }, { y: 250 });
    expect(trigger).toBeCalledTimes(1);
  });

  // TODO: Put these in separate tests
  it('Pull down triggers only when > 100px diff', () => {
    onSwipe(DOWN, trigger);

    expect(trigger).not.toBeCalled();
    // pull up
    testSwipe({ y: 50 }, { y: 40 });
    expect(trigger).not.toBeCalled();
    // pull sideways
    fireEvent.touchStart(document, touchDown({ x: 20 }));
    fireEvent.touchEnd(document, touchUp({ x: 40 }));
    expect(trigger).not.toBeCalled();
    // pull from not top of document
    window.scrollY = 10;
    fireEvent.touchStart(document, touchDown({ x: 20 }));
    fireEvent.touchEnd(document, touchUp({ x: 40 }));
    expect(trigger).not.toBeCalled();
    window.scrollY = 0;
    // pull down not far enough
    fireEvent.touchStart(document, touchDown({ y: 50 }));
    fireEvent.touchEnd(document, touchUp({ y: 70 }));
    expect(trigger).not.toBeCalled();
    // pull down
    fireEvent.touchStart(document, touchDown({ y: 50 }));
    fireEvent.touchEnd(document, touchUp({ y: 250 }));
    expect(trigger).toBeCalledTimes(1);
  });
});
