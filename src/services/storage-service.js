
export function createStorageService({keyPrefix}) {
  let storageService = new StorageService({keyPrefix});

  console.log(`created StorageService with keyPrefix ${keyPrefix}`, storageService);

  storageService.testLocalStorage();

  return storageService;
}

function StorageService({keyPrefix}) {
  this.keyPrefix = keyPrefix;
}

const prototype = {
  loadInitialState() {
    return Object.keys(localStorage).reduce((state, storageKey) => {
      if (storageKey.includes(this.keyPrefix)) {
        const stateKeys = storageKey
          .replace(this.keyPrefix, '')
          .toLowerCase()
          .split('.')
          .map(key =>
            key
              .split('-')
              .map((token, index) =>
                index === 0
                  ? token
                  : token.charAt(0).toUpperCase() + token.slice(1)
              )
              .join('')
          );
        let currentStateRef = state;
        stateKeys.forEach((key, index) => {
          if (index === stateKeys.length - 1) {
            currentStateRef[key] = JSON.parse(localStorage.getItem(storageKey));
            return;
          }
          currentStateRef[key] = currentStateRef[key] || {};
          currentStateRef = currentStateRef[key];
        });
      }
      return state;
    }, {});
  },

  setItem(key, value) {
    localStorage.setItem(`${this.keyPrefix}${key}`, JSON.stringify(value));
  },

  getItem(key) {
    return JSON.parse(localStorage.getItem(`${this.keyPrefix}${key}`));
  },

  removeItem(key) {
    localStorage.removeItem(`${this.keyPrefix}${key}`);
  },

  /** Tests that localStorage exists, can be written to, and read from. */
  testLocalStorage() {
    const testValue = 'testValue';
    const testKey = 'testKey';
    let retrievedValue;
    const errorMessage = 'localStorage did not return expected value';

    this.setItem(testKey, testValue);
    retrievedValue = this.getItem(testKey);
    this.removeItem(testKey);

    if (retrievedValue !== testValue) {
      throw new Error(errorMessage);
    }
  }
};

StorageService.prototype = prototype;
StorageService.prototype.constructor = StorageService;
