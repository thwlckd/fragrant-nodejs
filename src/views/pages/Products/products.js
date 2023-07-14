import { $, $create, $append } from '/js/util/dom.js';
import insertProducts from '/components/Products/Products.js';

async function dropdownRenderer($target, url) {
  const { brands, notes } = await fetch(url).then((res) => res.json());
  const items = brands || notes;

  const $fragment = document.createDocumentFragment();

  items.forEach(({ name, type }) => {
    const itemName = name ? name.korean : type;
    const attr = { value: itemName };
    const [current] = window.location.pathname.split('/').slice(-2);
    if (decodeURIComponent(current) === itemName) {
      attr.selected = true;
    }

    const $item = $create('option', '', attr);
    $item.textContent = itemName;

    $append($fragment, $item);
  });

  $append($target, $fragment);
}

async function gendersRenderer($target) {
  const items = ['Man', 'Woman', 'Unisex'];

  const $fragment = document.createDocumentFragment();

  items.forEach((v) => {
    const attr = { value: v };
    const [current] = window.location.pathname.split('/').slice(-2);
    if (decodeURIComponent(current) === v.toLowerCase()) {
      attr.selected = true;
    }
    const $item = $create('option', '', attr);
    $item.textContent = v;

    $append($fragment, $item);
  });

  $append($target, $fragment);
}

function searchToObject(searchParam) {
  const searchObj = searchParam
    .replace('?', '')
    .split('&')
    .reduce((acc, search) => {
      const [key, value] = search.split('=');
      acc[key] = value;
      return acc;
    }, {});

  return searchObj;
}

function objectToSearch(obj) {
  const searchParam = `?${Object.entries(obj)
    .map(([key, value]) => `${key}=${value}`)
    .join('&')}`;

  return searchParam;
}

function createPagination(totalPage) {
  const { pathname, search } = window.location;
  const searchObj = search ? searchToObject(search) : {};

  searchObj.page = searchObj.page || 1;

  const $target = $('#pagination');
  const $fragment = document.createDocumentFragment();
  const $pageWrapper = $create('ul', 'pageWrapper');

  const $prevPage = $create('div', 'prevPage');
  $append($fragment, $prevPage);

  const prevImage = '/asset/icon/left.svg';
  const $previmg = $create('img', '', { src: prevImage });
  $append($prevPage, $previmg);

  if (searchObj.page > 1) {
    $prevPage.style.cursor = 'pointer';
    $prevPage.addEventListener('click', () => {
      window.location.href = pathname + objectToSearch({ ...searchObj, page: +searchObj.page - 1 });
    });
  }

  $append($fragment, $pageWrapper);
  for (let i = 1; i <= totalPage; i += 1) {
    const $pageItem = $create('li');
    $pageItem.textContent = i;

    if (Number(searchObj.page) !== i) {
      $pageItem.style.cursor = 'pointer';
      $pageItem.addEventListener('click', () => {
        window.location.href = pathname + objectToSearch({ ...searchObj, page: i });
      });
    } else {
      $pageItem.classList.add('current');
    }

    $append($pageWrapper, $pageItem);
  }

  const $nextPage = $create('div', 'prevPage');
  $append($fragment, $nextPage);

  const nextImage = '/asset/icon/right.svg';
  const $nextImg = $create('img', '', { src: nextImage });
  $append($nextPage, $nextImg);

  if (searchObj.page < totalPage) {
    $nextPage.style.cursor = 'pointer';
    $nextPage.addEventListener('click', () => {
      window.location.href = pathname + objectToSearch({ ...searchObj, page: +searchObj.page + 1 });
    });
  }

  $append($target, $fragment);
}

async function productsRenderer($target) {
  const { pathname, search } = window.location;
  const totalPage = await insertProducts($target, `/api${pathname}${search}`);

  if (totalPage) createPagination(totalPage);
  else {
    $target.classList.add('no-result');
    const [current] = window.location.pathname.split('/').slice(-2);
    const decoded = decodeURIComponent(current);
    $target.textContent = `찾으시는
    < ${decoded} > 에 해당하는
    목록이 존재하지 않습니다.`;

    const $anchor = $create('a', '', { href: '/products' });
    $anchor.textContent = '-> 전체 목록으로 돌아가기 <-';
    $append($target, $anchor);
  }
}

const $brands = $('#brand-selector');
dropdownRenderer($brands, '/api/brands');

$brands.addEventListener('change', ({ target: { value } }) => {
  if (value !== '#') window.location.href = `/products/brands/${value}`;
});

const $notes = $('#note-selector');
dropdownRenderer($notes, '/api/notes');

$notes.addEventListener('change', ({ target: { value } }) => {
  if (value !== '#') window.location.href = `/products/notes/${value}`;
});

const $gender = $('#gender-selector');
gendersRenderer($gender);

$gender.addEventListener('change', ({ target: { value } }) => {
  if (value !== '#') window.location.href = `/products/genders/${value.toLowerCase()}`;
});

const $products = $('#products');
productsRenderer($products);
