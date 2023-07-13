import { productCreateFormInit, productCreateEventInit, productListInit } from '/js/util/init.js';

const render = () => {
  productCreateFormInit();
  productCreateEventInit();
  productListInit();
};
render();
