export const setIdleCallback = (callback: () => void, timeout: number) => {
  if (typeof window.requestIdleCallback !== 'undefined') {
    const id = window.requestIdleCallback(
      callback,
      timeout ? { timeout } : undefined
    );
    return () => {
      window.cancelIdleCallback(id);
    };
  } else {
    const id = window.setTimeout(callback, timeout || 0);
    return () => {
      window.clearTimeout(id);
    };
  }
};
