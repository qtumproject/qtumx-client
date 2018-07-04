import store from 'store';
import defaultConfig from '@/defaultConfig';

export default {
  set(key, value, expires = null) {
    store.set(key, {
      value,
      expired_at: expires === null ? null : (+new Date + expires * 1000),
    });
  },
  get(key, defaultValue) {
    const temp = store.get(key);
    try {
      const value = temp.value;
      if (value === undefined || (temp.expired_at !== null && temp.expired_at < +new Date)) {
        return defaultValue;
      }
      return value;
    } catch (e) {
      return defaultValue;
    }
  },
  getApiConfig() {
    return defaultConfig.api;
  },
};
