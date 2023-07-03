export const $ = (selector) => document.querySelector(selector);

export const $create = (elementType, className = "", attr = {}) => {
  const element = document.createElement(elementType);
  className && (element.className = className);
  for (const key in attr) {
    element.setAttribute(key, attr[key]);
  }
  return element;
};

export const $append = (parent, ...children) => {
  if (children.length) {
    parent.append(...children);
  }
};


