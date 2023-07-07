import { headerFetch } from "../../../js/util/admin.js";
import { $ } from "../../../js/util/dom.js";

const { head, header, closeBtn } = await headerFetch();

document.head.append(head);
$("#app").prepend(closeBtn);
$("#app").prepend(header);

const $headerClostBtn = $(".header-close-btn");
const $header = $("header");
$headerClostBtn.addEventListener("click", () => {
  $header.classList.toggle("header-off");
});

// 임시코드
$header.classList.add("header-off");
