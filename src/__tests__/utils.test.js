import { getTimestamp, validateOptions } from '../utils';

let logger;
let originalWarn;

beforeEach(() => {
  originalWarn = console.warn;
  console.warn = jest.fn();
  logger = { warn: jest.fn() };
});

afterEach(() => {
  console.warn = originalWarn;
});

describe('utils', () => {
  describe('validateOptions', () => {
    it('warns for invalid option', () => {
      validateOptions({ logger, bad: 'no' });
      expect(logger.warn).toBeCalledWith('bad is not a valid option');
    });

    it('does not warn for valid option', () => {
      validateOptions({ logger, timeout: 100 });
      expect(logger.warn).not.toBeCalled();
    });

    it('does not warn for no options', () => {
      validateOptions();
      expect(console.warn).not.toBeCalled();
    });
  });

  describe('getTimestamp', () => {
    it('returns number', () => {
      expect(typeof getTimestamp()).toBe('number');
    });
  });
});
