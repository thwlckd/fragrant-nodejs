import { headerFetch } from "../../../js/util/admin.js";

const { head, body } = await headerFetch();

document.head.append(head);
document.body.prepend(body);

const $header = document.querySelector("header");
$header.addEventListener("click", ()=>{
  console.log("ss")
})
