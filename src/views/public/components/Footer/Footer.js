import { $create, $append } from "/js/util/dom.js";

const $footer = $create("footer");
const $footerWrap = $create("div", "foooter-wrap");
$footer.append($footerWrap);

const $teamInfoFnb = $create("div", "fnb");
const $memberInfoFnb = $create("div", "fnb");
const $linkFnb = $create("div", "fnb");
const $themeFnb = $create("div", "fnb");
$footerWrap.append($teamInfoFnb, $memberInfoFnb, $linkFnb, $themeFnb);

const fnbCategory = [
  {
    category: $teamInfoFnb,
    title: "팀 소개",
    itemList: [
      { name: "14조", href: "#idx" },

      { name: "향기나조", href: "#smell" },
      {
        name: "팀 모토",
        href: "https://file.notion.so/f/s/39f1df02-5c6d-449f-9084-10d18ec618f3/Untitled.png?id=51a8b24c-98ba-44d7-adae-4b9f5891d419&table=block&spaceId=530d1033-cf9f-41a2-b140-62d3e90887dd&expirationTimestamp=1688515200000&signature=Ppg7EKCIFv7Z3G4JVX68uMWUwcaT2UQGOi9kU7SuOYM&downloadName=Untitled.png",
        target: "_blank",
      },
      { name: "엘리스", href: "#alice" },
    ],
  },
  {
    category: $memberInfoFnb,
    title: "팀원",
    itemList: [
      { name: "정충래", href: "#" },
      { name: "박창협", href: "#" },
      { name: "왕지은", href: "#" },
      { name: "우윤하", href: "#" },
      { name: "이수민", href: "#" },
      { name: "임소정", href: "#" },
    ],
  },
  {
    category: $linkFnb,
    title: "링크",
    itemList: [
      {
        name: "GitLab",
        href: "https://kdt-gitlab.elice.io/sw_track/class_05/web_project/team14/fragrant",
        target: "_blank",
      },
      {
        name: "Notion",
        href: "https://www.notion.so/elice/14-3856b72a7ab547168794793533b8751d?pvs=4",
        target: "_blank",
      },
    ],
  },
  // {
  //   category: $themeFnb,
  //   title: "테마",
  //   itemList: [
  //     { name: "핸드 & 바디 로션", href: "#handnbody" },
  //     { name: "바디 크림", href: "#body_cream" },
  //   ],
  // },
];

const $themeTitle = $create("div", "fnb-title");
$themeTitle.textContent = "테마";

const $themeSwitch = $create("input", "theme-switch", {
  type: "checkbox",
  role: "switch",
});

// const $themeSelect = $create("select", "fnb-title", {name:"theme"});
// const $themeDay = $create("option", "", {value:"day"});
// $themeDay.textContent = "☀️"
// const $themeNight = $create("option", "", {value:"night"});
// $themeNight.textContent = "🌙"

// $append($themeSelect, $themeDay, $themeNight);

$append(
  $themeFnb,
  $themeTitle,
  $themeSwitch
  // $themeSelect
);

function fnbFor(category = "", title = "", itemList = []) {
  const $title = $create("div", "fnb-title");
  $title.textContent = title;
  const itemResult = [];
  itemList.forEach((item) => {
    const $item = $create("a", "list", {
      href: item.href,
      target: item.target || "",
    });
    $item.textContent = item.name;
    itemResult.push($item);
  });

  $append(category, $title, ...itemResult);
}

fnbCategory.forEach(({ category, title, itemList }) => {
  fnbFor(category, title, itemList);
});

const $footerDetailWrap = $create("div", "foooter-detail-wrap");

$footer.append($footerDetailWrap);

const $companyName = $create("div", "company-name");
$companyName.textContent = "이엘아이씨이한국(유)";
const $ceo = $create("div", "list");
$ceo.textContent = "대표: Jeong, Choong-Rae";

const $address = $create("div", "list");
$address.textContent = "서울시 성동구 아차산로 17길 48로 성수낙낙 2층";

const $regNum = $create("div", "list");
$regNum.textContent = "사업자등록번호: 211-90-230701";

const $bizNum = $create("div", "list");
$bizNum.textContent = "통신판매업신고번호: 성동-30701호";

const $bizCheck = $create("a", "list", { href: "#" });
$bizCheck.textContent = "사업자정보조회";

const $license = $create("div", "list");
$license.textContent = "Copyright © 2023 Elice All Rights Reserved";

$append(
  $footerDetailWrap,
  $companyName,
  $ceo,
  $address,
  $regNum,
  $bizNum,
  $bizCheck,
  $license
);

document.body.append($footer);
