import { $create, $append } from '/js/util/dom.js';

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
  const { type, key } = e;
  if ((type === 'keydown' && key === 'Enter') || type === 'click') {
    e.preventDefault();
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

  const recommandList = ['조말론', '딥디크', 'dior', '메종', '바이레도'];

  const $recommandWrapper = $create('div', 'recommand-wrapper');

  $searchWrapper.append($searchInputWrapper, $infoText, $recommandWrapper);

  recommandList.forEach((item) => {
    const $recommandItem = $create('a', 'recommand-item');
    $recommandItem.textContent = item;
    $recommandItem.href = `/products/search/${item}`;
    $recommandWrapper.append($recommandItem);
  });
}

async function gnbRightRenderer() {
  const res = await fetch('/api/auth/is-sign-in');
  if (res.ok) {
    const { isAdmin } = await res.json();
    $accountIcon.addEventListener('click', () => {
      window.location.href = '/user/mypage';
    });

    $logoutIcon.addEventListener('click', async () => {
      await fetch('/api/auth/sign-out', { method: 'POST' });
      window.location.href = '/';
    });

    if (isAdmin) {
      const $adminIcon = $create('img', '', { src: '/asset/icon/admin.svg' });
      $adminIcon.addEventListener('click', async () => {
        window.location.href = '/admin/users';
      });
      $append($gnbRight, $adminIcon, $searchIcon, $accountIcon, $bagIcon, $logoutIcon);
    } else {
      $append($gnbRight, $searchIcon, $accountIcon, $bagIcon, $logoutIcon);
    }
  } else {
    $accountIcon.addEventListener('click', () => {
      window.location.href = '/login';
    });

    $append($gnbRight, $searchIcon, $accountIcon, $bagIcon);
  }
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
  $bagIcon.addEventListener('click', () => {
    window.location.href = '/cart';
  });

  gnbRightRenderer();

  $append($headerWrapper, $gnbLeft, $homeLink, $gnbRight);
  $headerElement.append($menuWrapper);

  $menuWrapper.addEventListener('mouseleave', menuLeaveHandler);
  $menuWrapper.append($lnbWrapper);

  const $newLnb = $create('div', 'lnb');
  const $brandLnb = $create('div', 'lnb');
  const $scentsLnb = $create('div', 'lnb');
  const $genderLnb = $create('div', 'lnb');

  $lnbWrapper.append($newLnb, $brandLnb, $scentsLnb, $genderLnb);

  categoryWithThumbRenderer([$newLnb, '신제품'], '/api/products?perPage=5');
  categoryRenderer([$brandLnb, '브랜드', 'brands'], '/api/brands');
  categoryRenderer([$scentsLnb, 'scent', 'notes'], '/api/notes');

  const $genderLnbTitle = $create('div', 'lnb-title');
  $genderLnbTitle.textContent = 'gender';
  $append($genderLnb, $genderLnbTitle);

  ['Man', 'Woman', 'Unisex'].forEach((item) => {
    const name = item;
    const $item = $create('a', 'list', {
      href: `/products/genders/${name.toLowerCase()}`,
    });
    $item.textContent = name;
    $append($genderLnb, $item);
  });

  searchRenderer();

  document.body.prepend($headerElement);
}

addFavicon();

headerRenderer();
