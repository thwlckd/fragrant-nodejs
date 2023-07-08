import { $ } from "/js/util/dom.js";

$("#address-search").addEventListener("click", () => {
  new daum.Postcode({
    oncomplete: (data) => {
      const $postalCode = $("#postalCode");
      const $address1 = $("#address1");
      const $address2 = $("#address2");
      $postalCode.value = data.zonecode;
      $address1.value = data.address;
      $address2.value = "";
      $address2.focus();
    },
  }).open();
});
