// /js/v2/utils/dom.js

// -------------------------------------------------
// QUERY HELPERS
// -------------------------------------------------

export function qs(selector, root = document) {
  return root.querySelector(selector);
}

export function qsa(selector, root = document) {
  return Array.from(root.querySelectorAll(selector));
}

// -------------------------------------------------
// ELEMENT CREATION
// -------------------------------------------------

export function createEl(tag, attrs = {}, children = null) {
  const el = document.createElement(tag);

  // Apply attributes
  Object.entries(attrs).forEach(([key, value]) => {
    el.setAttribute(key, value);
  });

  // Add children
  if (children) {
    if (Array.isArray(children)) {
      children.forEach(child => appendChild(el, child));
    } else {
      appendChild(el, children);
    }
  }

  return el;
}

function appendChild(parent, child) {
  if (typeof child === "string") {
    parent.insertAdjacentHTML("beforeend", child);
  } else {
    parent.appendChild(child);
  }
}

// -------------------------------------------------
// EVENT HELPERS
// -------------------------------------------------

export function on(el, event, handler) {
  el.addEventListener(event, handler);
}

export function delegate(root, selector, event, handler) {
  root.addEventListener(event, (e) => {
    const target = e.target.closest(selector);
    if (target) handler(e, target);
  });
}
