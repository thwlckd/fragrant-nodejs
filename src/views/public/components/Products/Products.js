import { $, $create, $append } from '../../js/util/dom.js';

const insertList = async ($target, url) => {
  const $fragment = document.createDocumentFragment();

  const { products } = await fetch(url).then((res) => res.json());

  products.forEach(({ id, name: { origin, korean }, price, capacity, img }) => {
    const $liElement = $create('li', 'product');

    const $anchorElemenet = $create('a', '', { href: `/products/${id}` });
    $liElement.append($anchorElemenet);

    const $imgElement = $create('img', '', { src: img });

    const $koreanNameElement = $create('p', 'name-kr');
    $koreanNameElement.textContent = korean;

    const $originNameElement = $create('p', 'name-origin');
    $originNameElement.textContent = origin;

    const $priceElement = $create('p');
    $priceElement.textContent = `${price.toLocaleString()} ￦`;

    const $capacityElement = $create('p');
    $capacityElement.textContent = capacity;

    $append(
      $anchorElemenet,
      $imgElement,
      $koreanNameElement,
      $originNameElement,
      $priceElement,
      $capacityElement,
    );

    const $addCartBtnElement = $create('button', 'add-cart-btn');
    $addCartBtnElement.textContent = '장바구니 담기';

    $append($liElement, $addCartBtnElement);

    $fragment.append($liElement);
  });

  $target.replaceChildren($fragment);
};

if (window.location.pathname === '/') {
  const $newProducts = $('#new-products');
  setTimeout(() => insertList($newProducts, '/dummy/newProducts.json'), 1000);

  const $pbProducts = $('#PB-products');
  setTimeout(() => insertList($pbProducts, '/dummy/pbProducts.json'), 1000);
}
