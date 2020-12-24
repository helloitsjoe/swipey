const validOptions = ['delta', 'timeout', 'fromTop', 'element'];

// TODO: Remove this with TS
export const validateOptions = (options = {}) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const key of Object.keys(options)) {
    if (!validOptions.includes(key)) {
      console.warn(`${key} is not a valid option`);
    }
  }
};

export const getTimestamp = () => Date.now();
