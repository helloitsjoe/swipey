import { validateOptions } from '../utils';

let originalWarn;

beforeEach(() => {
  originalWarn = console.warn;
  console.warn = jest.fn();
});

afterEach(() => {
  console.warn = originalWarn;
});

describe('utils', () => {
  describe('validateOptions', () => {
    it('warns for invalid option', () => {
      validateOptions({ bad: 'no' });
      expect(console.warn).toBeCalledWith('bad is not a valid option');
    });

    it('does not warn for valid option', () => {
      validateOptions({ timeout: 100 });
      expect(console.warn).not.toBeCalled();
    });

    it('does not warn for no options', () => {
      validateOptions();
      expect(console.warn).not.toBeCalled();
    });
  });
});
