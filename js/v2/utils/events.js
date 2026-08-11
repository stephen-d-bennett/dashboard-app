// /js/v2/utils/events.js

// -------------------------------------------------
// CUSTOM EVENT DISPATCHER
// -------------------------------------------------

export function emit(name, detail = {}) {
  document.dispatchEvent(
    new CustomEvent(name, { detail })
  );
}

// -------------------------------------------------
// CUSTOM EVENT LISTENER
// -------------------------------------------------

export function listen(name, handler) {
  document.addEventListener(name, (e) => handler(e.detail));
}

// -------------------------------------------------
// DEBOUNCE
// -------------------------------------------------

export function debounce(fn, delay = 200) {
  let timer = null;

  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// -------------------------------------------------
// THROTTLE
// -------------------------------------------------

export function throttle(fn, limit = 200) {
  let inThrottle = false;

  return function (...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;

      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}
