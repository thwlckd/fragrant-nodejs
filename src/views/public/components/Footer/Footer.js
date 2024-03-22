import { $create, $append } from '/js/util/dom.js';

const $footer = $create('footer');

const $img = $create('img', '', { src: '/asset/favicon/android-icon-96x96.png' });
$img.addEventListener('click', () => {
  window.location.href = '/';
});

const $footerDetailWrap = $create('div', 'footer-detail-wrap');

$footer.append($img, $footerDetailWrap);

const $companyName = $create('div', 'company-name');
$companyName.textContent = '이엘아이씨이한국(유)';
const $ceo = $create('div', 'list');
$ceo.textContent = '대표: 향기나조 (14)';

const $address = $create('div', 'list');
$address.textContent = '서울시 성동구 아차산로 17길 48로 성수낙낙 2층';

const $regNum = $create('div', 'list');
$regNum.textContent = '사업자등록번호: 211-90-230701';

const $bizNum = $create('div', 'list');
$bizNum.textContent = '통신판매업신고번호: 성동-30701호';

const $bizCheck = $create('a', 'list', { href: '#' });
$bizCheck.textContent = '사업자정보조회';

const $license = $create('div', 'list');
$license.textContent = 'Copyright © 2023 Elice All Rights Reserved';

$append(
  $footerDetailWrap,
  $companyName,
  $ceo,
  $address,
  // $regNum, $bizNum, $bizCheck,
  $license,
);

// const $teamDetailWrap = $create('div', 'footer-detail-wrap');

// $footer.append($teamDetailWrap);

// const $teamName = $create('div', 'team-name');
// $teamName.textContent = '향기나조 (14조) - 일. 단. 하. 자';
// const $member = $create('div', 'list');
// $member.textContent = '정충래, 박창협, 왕지은, 우윤하, 이수민, 임소정, ';

// const $address1 = $create('a', 'list', {
//   href: 'https://www.notion.so/b6dcee169e144bd4a4c767b8ba71c1c2',
// });
// $address1.textContent = '팀 노션';

// const $address2 = $create('a', 'list', {
//   href: 'https://kdt-gitlab.elice.io/sw_track/class_05/web_project/team14/fragrant',
// });
// $address2.textContent = '팀 깃랩';

// $append($teamDetailWrap, $teamName, $member, $address1, $address2);

document.body.append($footer);
