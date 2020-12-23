import { fireEvent } from '@testing-library/dom';
import { swipes, testSwipe, touchDown, touchUp } from '../test-utils';
import { Directions } from '../index';

const { LEFT, RIGHT, UP, DOWN } = Directions;

jest.mock('@testing-library/dom');

fireEvent.touchStart = jest.fn();
fireEvent.touchEnd = jest.fn();

afterEach(() => {
  jest.clearAllMocks();
});

it('touchDown', () => {
  const touchDownX = { touches: [{ clientX: 5, clientY: 100 }] };
  const touchDownY = { touches: [{ clientX: 100, clientY: 5 }] };
  expect(touchDown({ x: 5 })).toEqual(touchDownX);
  expect(touchDown({ y: 5 })).toEqual(touchDownY);
});

it('touchUp', () => {
  const touchUpX = { changedTouches: [{ clientX: 5, clientY: 100 }] };
  const touchUpY = { changedTouches: [{ clientX: 100, clientY: 5 }] };
  expect(touchUp({ x: 5 })).toEqual(touchUpX);
  expect(touchUp({ y: 5 })).toEqual(touchUpY);
});

it('testSwipe', () => {
  testSwipe({ x: 5 }, { x: 10 });
  const touchStartEvent = { touches: [{ clientX: 5, clientY: 100 }] };
  const touchEndEvent = { changedTouches: [{ clientX: 10, clientY: 100 }] };
  expect(fireEvent.touchStart).toBeCalledWith(document, touchStartEvent);
  expect(fireEvent.touchEnd).toBeCalledWith(document, touchEndEvent);
});

describe('swipes', () => {
  it('left', () => {
    const touchStartEvent = { touches: [{ clientX: 250, clientY: 100 }] };
    const touchEndEvent = { changedTouches: [{ clientX: 50, clientY: 100 }] };
    swipes[LEFT]();
    expect(fireEvent.touchStart).toBeCalledWith(document, touchStartEvent);
    expect(fireEvent.touchEnd).toBeCalledWith(document, touchEndEvent);
  });

  it('right', () => {
    const touchStartEvent = { touches: [{ clientX: 50, clientY: 100 }] };
    const touchEndEvent = { changedTouches: [{ clientX: 250, clientY: 100 }] };
    swipes[RIGHT]();
    expect(fireEvent.touchStart).toBeCalledWith(document, touchStartEvent);
    expect(fireEvent.touchEnd).toBeCalledWith(document, touchEndEvent);
  });

  it('up', () => {
    const touchStartEvent = { touches: [{ clientX: 100, clientY: 250 }] };
    const touchEndEvent = { changedTouches: [{ clientX: 100, clientY: 50 }] };
    swipes[UP]();
    expect(fireEvent.touchStart).toBeCalledWith(document, touchStartEvent);
    expect(fireEvent.touchEnd).toBeCalledWith(document, touchEndEvent);
  });

  it('down', () => {
    const touchStartEvent = { touches: [{ clientX: 100, clientY: 50 }] };
    const touchEndEvent = { changedTouches: [{ clientX: 100, clientY: 250 }] };
    swipes[DOWN]();
    expect(fireEvent.touchStart).toBeCalledWith(document, touchStartEvent);
    expect(fireEvent.touchEnd).toBeCalledWith(document, touchEndEvent);
  });
});
