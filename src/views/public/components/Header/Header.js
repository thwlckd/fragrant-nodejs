import { $create, $append } from '../../js/util/dom.js';
import dummy from '../../dummy/brandLnb.json' assert { type: 'json' };

const $favicon = $create('link', '', {
  rel: 'shortcut icon',
  href: '/asset/favicon/favicon.ico',
  type: 'image/x-icon',
});

document.head.append($favicon);

const $headerElement = $create('header');
const $headerWrapper = $create('div', 'header-wrapper');
$headerElement.append($headerWrapper);

const $gnbLeft = $create('div', 'gnb-left');
const $menuIcon = $create('img', 'menu', { src: '/asset/icon/menu.svg' });
$append($gnbLeft, $menuIcon);

$menuIcon.addEventListener('click', menuClickHandler);

const $homeLink = $create('a', '', { href: '/' });
$homeLink.textContent = 'ELICE';
const $gnbRight = $create('div', 'gnb-right');

const $searchIcon = $create('img', '', { src: '/asset/icon/search.svg' });
const $accountIcon = $create('img', '', { src: '/asset/icon/account.svg' });
// const $heartIcon = $create("img", "", { src: "/asset/icon/heart.svg" });
const $bagIcon = $create('img', '', { src: '/asset/icon/bag.svg' });
$append(
  $gnbRight,
  $searchIcon,
  $accountIcon,
  // $heartIcon,
  $bagIcon,
);

$searchIcon.addEventListener('click', searchHandler);

$append($headerWrapper, $gnbLeft, $homeLink, $gnbRight);

const $menuWrapper = $create('nav', 'menu-wrapper');
$headerElement.append($menuWrapper);

$menuWrapper.addEventListener('mouseleave', menuLeaveHandler);

const $lnbWrapper = $create('div', 'lnb-wrapper');
$menuWrapper.append($lnbWrapper);

// $menuWrapper.addEventListener("mouseleave", menuHandler);

const $newLnb = $create('div', 'lnb');
const $pbLnb = $create('div', 'lnb');
const $brandLnb = $create('div', 'lnb');
const $scentsLnb = $create('div', 'lnb');
const $bathLnb = $create('div', 'lnb');

$lnbWrapper.append($newLnb, $pbLnb, $brandLnb, $scentsLnb, $bathLnb);

const lnbCategory = [
  {
    category: $newLnb,
    title: '신제품',
    itemList: [
      { name: '비바 마젠타', href: '#viva_majenta' },
      { name: '베리 페리', href: '#veri_peri' },
      { name: '엘리스', href: '#alice' },
    ],
  },
  {
    category: $pbLnb,
    title: 'PB',
    itemList: [
      { name: '엘리스 서울', href: '#elice_seoul' },
      { name: '엘리스 뉴욕', href: '#elice_newyork' },
      { name: '엘리스 시드니', href: '#elice_sydney' },
      { name: '엘리스 파리', href: '#elice_paris' },
    ],
  },
  { category: $brandLnb, title: '브랜드', itemList: [] },
  {
    category: $scentsLnb,
    title: '센트',
    itemList: [
      { name: '시트러스', href: '#citrus' },
      { name: '플로럴', href: '#floral' },
      { name: '그린', href: '#green' },
      { name: '프루티', href: '#fruity' },
      { name: '스파이시', href: '#spicy' },
      { name: '우디', href: '#woody' },
      { name: '파우더러', href: '#powdery' },
      { name: '허벌', href: '#herbal' },
      { name: '센트 전체 보기', href: '#all' },
    ],
  },
  {
    category: $bathLnb,
    title: '배쓰 앤 바디',
    itemList: [
      { name: '핸드 & 바디 로션', href: '#handnbody' },
      { name: '바디 크림', href: '#body_cream' },
      { name: '리퀴드 솝', href: '#liquid_soap' },
      { name: '솝', href: '#soap' },
      { name: '페이스 케어', href: '#face_care' },
      { name: '배쓰 앤 바디 전체 보기', href: '#all' },
    ],
  },
];

lnbCategory[0].thumnail = '/asset/perfume/viva_magenta_swipe_thumbnail.png';
lnbCategory[1].thumnail = '/asset/perfume/MB_Brit_LP_stories_opt-2.png';
lnbCategory[2].itemList = dummy;

lnbCategory.forEach(({ category, title, thumnail, itemList }) => {
  lnbFor(category, title, thumnail, itemList);
});

const $searchWrapper = $create('div', 'search-wrapper');
$menuWrapper.append($searchWrapper);

const $searchInputWrapper = $create('div', 'search-input-wrapper');

const $searchInput = $create('input', 'search-input', {
  type: 'text',
  placeholder: '찾으시는 상품을 입력해주세요',
});
const $inputDeleteIcon = $create('img', 'icon', { src: '/asset/icon/x.svg' });
const $inputSearchIcon = $create('img', 'icon', {
  src: '/asset/icon/search_gray.svg',
});

$inputDeleteIcon.addEventListener('click', inputDeleteHandler);

$searchInputWrapper.append($searchInput, $inputDeleteIcon, $inputSearchIcon);

$searchInput.addEventListener('keydown', inputSearchHandler);
$inputSearchIcon.addEventListener('click', inputSearchHandler);

const $infoText = $create('div', 'info-text');
$infoText.textContent = '추천해 드릴까요?';

const recommandList = ['비바 마젠타', '엘리스 서울', 'NEW PANTONE COLLECTION', '엘리스 시드니'];

const $recommandWrapper = $create('div', 'recommand-wrapper');

$searchWrapper.append($searchInputWrapper, $infoText, $recommandWrapper);

recommandList.forEach((item) => {
  const $recommandItem = $create('a', 'recommand-item');
  $recommandItem.textContent = item;
  $recommandItem.href = `/products?search=${item}`;
  $recommandWrapper.append($recommandItem);
});

document.body.prepend($headerElement);

function menuLeaveHandler() {
  $menuIcon.classList.remove('on');
  $searchIcon.classList.remove('on');
  $menuWrapper.classList.remove('menu-wrapper-open');
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

function lnbFor(category = '', title = '', thumnail = '', itemList = []) {
  const $title = $create('div', 'lnb-title');
  $title.textContent = title;

  const $Thumnail = thumnail
    ? $create('img', 'thumnail', {
        src: thumnail,
      })
    : undefined;

  let itemResult = [];
  if ($Thumnail) {
    itemResult.push($Thumnail);
  }
  itemList.forEach((item) => {
    const $item = $create('a', 'list', { href: item.href });
    $item.textContent = item.name;
    itemResult.push($item);
  });

  $append(category, $title, ...itemResult);
}

function inputDeleteHandler() {
  $searchInput.value = '';
}

function inputSearchHandler(e) {
  // console.log(e);
  switch (true) {
    case e.type === 'keydown':
      if (e.keyCode === 13) {
        $searchInput.value ? (location.href = `/products?search=${$searchInput.value}`) : false;
      }
      break;
    case e.type === 'click':
      $searchInput.value ? (location.href = `/products?search=${$searchInput.value}`) : false;
      break;
  }
}
