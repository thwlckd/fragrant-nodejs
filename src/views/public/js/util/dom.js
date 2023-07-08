export const $ = (selector) => document.querySelector(selector);
export const $all = (selector) => document.querySelectorAll(selector);

export const $create = (elementType, className = '', attr = {}) => {
  const element = document.createElement(elementType);

  if (className) element.classList.add(className);

  Object.entries(attr).forEach(([key, value]) => element.setAttribute(key, value));

  return element;
};

export const $append = (parent, ...children) => {
  if (children.length) {
    parent.append(...children);
  }
};
