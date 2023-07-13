import { $, $create, $append } from '/js/util/dom.js';

const insertProducts = async ($target, url) => {
  const $fragment = document.createDocumentFragment();

  const { products, totalPage } = await fetch(url).then((res) => res.json());

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

  return totalPage;
};

const fyShuffle = (arr) => {
  const result = [];
  while (arr.length) {
    const lastIdx = arr.length - 1;
    const roll = Math.floor(Math.random() * arr.length);
    const temp = arr[lastIdx];
    arr[lastIdx] = arr[roll];
    arr[roll] = temp;
    result.push(arr.pop());
  }
  return result;
};

const makeCatList = async () => {
  const { brands } = await fetch('/api/brands').then((res) => res.json());
  const list = fyShuffle(brands.filter(({ name: { korean } }) => korean !== '엘리스')).slice(0, 3);

  list.forEach(({ name: { korean }, picture }, i) => {
    const $random = $(`#random${i + 1}`);
    const $ranTitle = $create('h2', 'products-title');
    $ranTitle.textContent = korean;

    const $anchor = $create('a', '', { href: `/products/brands/${korean}` });
    $anchor.textContent = '더보기';

    const $wrapper = $create('div', 'random-wrapper');

    const $imgWrapper = $create('div', 'random-img-wrapper');
    const $img = $create('img', '', { src: picture });
    $append($imgWrapper, $img);

    const $ranList = $create('ul', 'products');
    $ranList.classList.add('random');
    if (i % 2) {
      $append($wrapper, $ranList, $imgWrapper);
    } else {
      $append($wrapper, $imgWrapper, $ranList);
    }

    insertProducts($ranList, `/api/products/brands/${korean}?perPage=4`).then(() => {
      $append($random, $anchor, $ranTitle, $wrapper);
    });
  });
};

const { pathname } = window.location;
if (pathname === '/') {
  const $newProducts = $('#new-products');
  insertProducts($newProducts, '/api/products?perPage=3');

  makeCatList();
}

export default insertProducts;
