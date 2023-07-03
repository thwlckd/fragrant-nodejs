import { $create, $append } from "../../js/util/dom.js";

const $footer = $create("footer");
const $footerWrap = $create("div", "foooter-wrap");
$footer.append($footerWrap);

const fnbCategory = [
  {
    category: $newLnb,
    title: "팀 소개",
    itemList: [
      { name: "팀명", href: "#viva_majenta" },
      { name: "베리 페리", href: "#veri_peri" },
      { name: "엘리스", href: "#alice" },
    ],
  },
  {
    category: $pbLnb,
    title: "PB",
    itemList: [
      { name: "엘리스 서울", href: "#elice_seoul" },
      { name: "엘리스 뉴욕", href: "#elice_newyork" },
      { name: "엘리스 시드니", href: "#elice_sydney" },
      { name: "엘리스 파리", href: "#elice_paris" },
    ],
  },
  { category: $brandLnb, title: "브랜드", itemList: [] },
  {
    category: $scentsLnb,
    title: "센트",
    itemList: [
      { name: "시트러스", href: "#citrus" },
      { name: "플로럴", href: "#floral" },
      { name: "그린", href: "#green" },
      { name: "프루티", href: "#fruity" },
      { name: "스파이시", href: "#spicy" },
      { name: "우디", href: "#woody" },
      { name: "파우더러", href: "#powdery" },
      { name: "허벌", href: "#herbal" },
      { name: "센트 전체 보기", href: "#all" },
    ],
  },
  {
    category: $bathLnb,
    title: "배쓰 앤 바디",
    itemList: [
      { name: "핸드 & 바디 로션", href: "#handnbody" },
      { name: "바디 크림", href: "#body_cream" },
      { name: "리퀴드 솝", href: "#liquid_soap" },
      { name: "솝", href: "#soap" },
      { name: "페이스 케어", href: "#face_care" },
      { name: "배쓰 앤 바디 전체 보기", href: "#all" },
    ],
  },
];

document.body.append($footer);
