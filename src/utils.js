const validOptions = ['delta', 'timeout', 'fromTop', 'element', 'logger'];

// TODO: Remove this with TS
export const validateOptions = (options = {}) => {
  const { logger = console } = options;

  // eslint-disable-next-line no-restricted-syntax
  for (const key of Object.keys(options)) {
    if (!validOptions.includes(key)) {
      logger.warn(`${key} is not a valid option`);
    }
  }
};

export const getTimestamp = () => Date.now();
