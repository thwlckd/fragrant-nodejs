import { $, $create, $append } from '/js/util/dom.js';

const insertList = async ($target, url) => {
  const $fragment = document.createDocumentFragment();

  const { products } = await fetch(url).then((res) => res.json());

  products.forEach(
    ({
      productId,
      name: { origin },
      brand: {
        name: { korean: brandKorean },
      },
      price,
      capacity,
      picture,
      description,
    }) => {
      const $liElement = $create('li', 'product');

      const $anchorElemenet = $create('a', '', { href: `/products/${productId}` });
      $liElement.append($anchorElemenet);

      const $imgElement = $create('img', '', { src: picture });

      const $brandNameElement = $create('p', 'brand-name-kr');
      $brandNameElement.textContent = brandKorean;

      const $originNameElement = $create('p', 'name-origin');
      $originNameElement.textContent = origin;

      const $descriptionElement = $create('p', 'description');
      $descriptionElement.textContent = description;

      const $priceInfoElement = $create('div', 'price-info');

      const $priceElement = $create('p', 'price');
      $priceElement.textContent = `${price.toLocaleString()} ￦`;

      const $capacityElement = $create('p', 'capacity');
      $capacityElement.textContent = capacity;

      $append($priceInfoElement, $priceElement, $capacityElement);

      $append(
        $anchorElemenet,
        $imgElement,
        $brandNameElement,
        $originNameElement,
        $descriptionElement,
        $priceInfoElement,
      );

      $fragment.append($liElement);
    },
  );

  $target.replaceChildren($fragment);
};

if (window.location.pathname === '/') {
  const $newProducts = $('#new-products');
  insertList($newProducts, '/api/products?perPage=3');

  const $pbProducts = $('#PB-products');
  insertList($pbProducts, '/api/products/brands/PB?perPage=4');
}
