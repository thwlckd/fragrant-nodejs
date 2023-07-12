import { $create, $append } from '../../js/util/dom.js';

const $menuIcon = $create('img', 'menu', { src: '/asset/icon/menu.svg' });

const $searchIcon = $create('img', '', { src: '/asset/icon/search.svg' });
const $accountIcon = $create('img', '', { src: '/asset/icon/account.svg' });
const $bagIcon = $create('img', '', { src: '/asset/icon/bag.svg' });
const $logoutIcon = $create('img', '', { src: '/asset/icon/logout.svg' });

const $menuWrapper = $create('nav', 'menu-wrapper');

const $lnbWrapper = $create('div', 'lnb-wrapper');

const $gnbRight = $create('div', 'gnb-right');

const $searchWrapper = $create('div', 'search-wrapper');

const $searchInput = $create('input', 'search-input', {
  type: 'text',
  placeholder: '찾으시는 상품을 입력해주세요',
});
const $inputDeleteIcon = $create('img', 'icon', { src: '/asset/icon/x.svg' });
const $inputSearchIcon = $create('img', 'icon', {
  src: '/asset/icon/search_gray.svg',
});

function addFavicon() {
  const $favicon = $create('link', '', {
    rel: 'shortcut icon',
    href: '/asset/favicon/favicon.ico',
    type: 'image/x-icon',
  });

  document.head.append($favicon);
}

function lnbFor(category = '', title = '', thumnail = '', itemList = [], to = '') {
  const $title = $create('div', 'lnb-title');
  $title.textContent = title;

  const $Thumnail = thumnail
    ? $create('img', 'thumnail', {
        src: thumnail,
      })
    : undefined;

  const itemResult = [];
  if ($Thumnail) {
    itemResult.push($Thumnail);
  }
  itemList.forEach((item) => {
    const name = item.type || item.name.korean;
    const $item = $create('a', 'list', {
      href: $Thumnail ? `/products/${name}` : `/products/${to}/${name}`,
    });
    $item.textContent = name;
    itemResult.push($item);
  });

  $append(category, $title, ...itemResult);
}

async function categoryRenderer(target, url) {
  try {
    const [$target, title, to] = target;
    const { products, brands, notes } = await fetch(url).then((res) => res.json());
    const items = products || brands || notes;

    lnbFor($target, title, '', items, to);
  } catch (e) {
    alert(e.message);
  }
}

async function categoryWithThumbRenderer(target, url) {
  try {
    const [$target, title] = target;
    const { products, brands, notes } = await fetch(url).then((res) => res.json());
    const items = products || brands || notes;

    let thumb;

    if (items.length) {
      thumb = items[0].picture;
    }

    lnbFor($target, title, thumb, items);
  } catch (e) {
    alert(e.message);
  }
}

function menuClickHandler() {
  $menuIcon.classList.toggle('on');
  $searchWrapper.style.display = 'none';
  if ($lnbWrapper.style.display === 'none') {
    $lnbWrapper.style.display = '';
  }
  if ($searchIcon.classList.contains('on')) {
    $searchIcon.classList.toggle('on');
    $lnbWrapper.style.display = '';
  } else {
    $menuWrapper.classList.toggle('menu-wrapper-open');
  }
}

function inputDeleteHandler() {
  $searchInput.value = '';
}

function searchHandler() {
  $searchIcon.classList.toggle('on');
  $lnbWrapper.style.display = 'none';
  if ($searchWrapper.style.display === 'none') {
    $searchWrapper.style.display = '';
  }
  if ($menuIcon.classList.contains('on')) {
    $menuIcon.classList.toggle('on');
    $searchWrapper.style.display = '';
  } else {
    $menuWrapper.classList.toggle('menu-wrapper-open');
    inputDeleteHandler();
  }
}

function menuLeaveHandler() {
  $menuIcon.classList.remove('on');
  $searchIcon.classList.remove('on');
  $menuWrapper.classList.remove('menu-wrapper-open');
}

function getSearchHandler(e) {
  e.preventDefault();

  console.log(e);
  const { type, key } = e;
  if ((type === 'keydown' && key === 'Enter') || type === 'click') {
    const searchValue = $searchInput.value;

    if (searchValue) window.location.href = `/products/search/${searchValue}`;
  }
}

async function searchRenderer() {
  $menuWrapper.append($searchWrapper);

  $inputDeleteIcon.addEventListener('click', inputDeleteHandler);

  const $searchInputWrapper = $create('div', 'search-input-wrapper');
  $searchInputWrapper.append($searchInput, $inputDeleteIcon, $inputSearchIcon);

  $searchInput.addEventListener('keydown', getSearchHandler);
  $inputSearchIcon.addEventListener('click', getSearchHandler);

  const $infoText = $create('div', 'info-text');
  $infoText.textContent = '추천해 드릴까요?';

  const recommandList = ['조말론', 'jo malone', '샤넬', '딥디크', 'dior', '엘리스'];

  const $recommandWrapper = $create('div', 'recommand-wrapper');

  $searchWrapper.append($searchInputWrapper, $infoText, $recommandWrapper);

  recommandList.forEach((item) => {
    const $recommandItem = $create('a', 'recommand-item');
    $recommandItem.textContent = item;
    $recommandItem.href = `/products/search/${item}`;
    $recommandWrapper.append($recommandItem);
  });
}

function gnbRightRenderer() {
  const token = document.cookie;
  console.log(token);
  $append($gnbRight, $searchIcon, $accountIcon, $bagIcon, $logoutIcon);
}

function headerRenderer() {
  const $headerElement = $create('header');
  const $headerWrapper = $create('div', 'header-wrapper');
  $headerElement.append($headerWrapper);

  const $gnbLeft = $create('div', 'gnb-left');
  $append($gnbLeft, $menuIcon);

  $menuIcon.addEventListener('click', menuClickHandler);

  const $homeLink = $create('a', '', { href: '/' });
  $homeLink.textContent = 'ELICE';

  $searchIcon.addEventListener('click', searchHandler);
  $accountIcon.addEventListener('click', () => {
    window.location.href = '/login';
  });

  gnbRightRenderer();

  $append($headerWrapper, $gnbLeft, $homeLink, $gnbRight);
  $headerElement.append($menuWrapper);

  $menuWrapper.addEventListener('mouseleave', menuLeaveHandler);
  $menuWrapper.append($lnbWrapper);

  const $newLnb = $create('div', 'lnb');
  const $pbLnb = $create('div', 'lnb');
  const $brandLnb = $create('div', 'lnb');
  const $scentsLnb = $create('div', 'lnb');
  const $bathLnb = $create('div', 'lnb');

  $lnbWrapper.append($newLnb, $pbLnb, $brandLnb, $scentsLnb, $bathLnb);

  categoryWithThumbRenderer([$newLnb, '신제품'], '/api/products?perPage=5');
  categoryWithThumbRenderer([$pbLnb, 'PB'], '/api/products/brands/PB?perPage=5');
  categoryRenderer([$brandLnb, '브랜드', 'brands'], '/api/brands');
  categoryRenderer([$scentsLnb, 'scent', 'notes'], '/api/notes');

  searchRenderer();

  document.body.prepend($headerElement);
}

addFavicon();

headerRenderer();
